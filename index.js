
//selectors

const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");  // ınput + button

// Variables

let gelirler = 0; //gelir girişlerini tutacak olan değişken
let harcamaListesi = []; //harcama objelerimizi tutacak olan array


//Hesap tablosu   // en alt taraf

const gelirinizTd = document.getElementById("geliriniz")
const giderinizTd = document.getElementById("gideriniz")
const kalanTd = document.getElementById("kalan")
const kalanTh = document.getElementById("kalanTh")


//harcama Formu  // kaydet tarafı
const harcamaFormu = document.getElementById("harcama-formu")
const harcamaAlaniInput = document.getElementById("harcama-alani")
const tarihInput = document.getElementById("tarih")
const miktarInput = document.getElementById("miktar")

//harcama tablosu
const harcamaBody = document.getElementById("harcama-body")
const temizleBtn = document.getElementById("temizle-btn")


//gelir Ekle Formu


ekleFormu.addEventListener("submit", (e) => {
    e.preventDefault()
    gelirler = gelirler + Number(gelirInput.value)
   
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.innerText = gelirler
    ekleFormu.reset()
    hesaplaVeGuncelle()
})

// Sayfa ilk açıldığında localStorage de bulunan verileri ekrana yazdırır, değişkenlere atama yapar

window.addEventListener("load", () => {
    gelirler = Number(localStorage.getItem("gelirler")) || 0
    gelirinizTd.innerText = gelirler
    tarihInput.valueAsDate = new Date()
    harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []

    harcamaListesi.forEach((harcama) => harcamayiDomaYaz(harcama))
    hesaplaVeGuncelle()

})

// Harcama girişlerinin yapılması

harcamaFormu.addEventListener("submit", (e) => {
    e.preventDefault() // reload u engeller

    const yeniHarcama = {
        id: new Date().getTime(),
        // tarih: tarihInput.value,
        tarih: new Date(tarihInput.value).toLocaleDateString(),
        alan: harcamaAlaniInput.value,
        miktar: miktarInput.value

    }

    // console.log(yeniHarcama)
    harcamaFormu.reset()
    tarihInput.valueAsDate = new Date()

    harcamaListesi.push(yeniHarcama)
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
    harcamayiDomaYaz(yeniHarcama)
    hesaplaVeGuncelle()
    console.log(harcamaListesi)
  
})




//Harcamayı Dom'a yaz

const harcamayiDomaYaz = ({ id, miktar, tarih, alan }) => {


    const tr = document.createElement("tr"); // tr elementi oluşturur
    // tr elementinin ilk üç td sini oluşturur.
    const appendTd = (content) => {
        const td = document.createElement("td");
        td.textContent = content;
        return td;
    }
    // tr elementinin son td sini oluşturur.
    const createLastTd = () => {
        const td = document.createElement("td");
        const iElement = document.createElement("i");
        iElement.id = id;
        iElement.className = "fa-solid fa-trash-can text-danger"
        iElement.type = "button";
        td.appendChild(iElement);
        return td;
    }

    // td oluşturarak tr ye ekleme

    tr.append(
        appendTd(tarih),
        appendTd(alan),
        appendTd(miktar),
        createLastTd()
    )


    harcamaBody.append(tr) // harcamayı sona ekler
    // harcamaBody.prepend(tr) // harcamayı öne ekler



}

const hesaplaVeGuncelle = () => {
    // gelirinizTd.innerText = gelirler //geliri ekrana yaz
    gelirinizTd.innerText = gelirler//geliri ekrana yaz

    //giderler toplamını bul
    const giderler = harcamaListesi.reduce(
        (toplam, harcama) => toplam + Number(harcama.miktar), 0
    )
        
   
    giderinizTd.innerText = new Intl.NumberFormat().format(giderler) //gider toplamını ekrana yaz
    kalanTd.innerText = new Intl.NumberFormat().format(gelirler - giderler)

    // Kalan 0 dan küçükse kalan ve miktarı kırmızı yaz
    const borclu = gelirler - giderler < 0;
    // console.log(borclu)

    kalanTd.classList.toggle('text-danger', borclu)
    kalanTh.classList.toggle('text-danger', borclu)
}

harcamaBody.addEventListener("click", (e) => {
    // console.log(e.target)

    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.parentElement.remove()
    }
    //silinen harcamanın id sini alır
    const id = e.target.id
    // console.log(id)
    // silinen harcamayı array den çıkarır
    harcamaListesi = harcamaListesi.filter((harcama => harcama.id != id))
    //yeni array i local e update eder
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))

    //silindikten sonra yeniden hesapla

    hesaplaVeGuncelle()



})

temizleBtn.addEventListener("click", () => {
    if (confirm('Silmek istediğinize emin misiniz?')) {
        harcamaListesi = [] //tüm harcamaları listeden siler
        gelirler = 0 //geliri sıfırlar
        // localStorage.clear() // tüm local storage siler
        localStorage.removeItem('gelirler') // sadece gelirleri siler
        localStorage.removeItem('harcamalar') // sadece gelirleri siler
        harcamaBody.innerHTML = "" // DOM dan harcamaları siler
        hesaplaVeGuncelle() //silindikten sonra yeniden hesapla
    }
})

const giderler = harcamaListesi.reduce(
    (toplam, harcama) => toplam + Number(harcama.miktar), 0
)



