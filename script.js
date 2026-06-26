// Data default menu Ulan Kitchen awal jika LocalStorage kosong
const menuAwal = [
  {
    id: "1",
    nama: "Risol Ayam Suir (3 pcs)",
    deskripsi: "Ayam suir gurih melimpah dibalut dengan kulit risoles yang super renyah.",
    harga: 18000,
    gambar: "images/Risol Ayam Suwir.png",
    placeholder: "menu-ayam.jpg"
  },
  {
    id: "2",
    nama: "Risol Sayur (3 pcs)",
    deskripsi: "Isian sayur klasik yang padat dan gurih, sangat cocok untuk camilan santai.",
    harga: 18000,
    gambar: "images/Risol Sayur.png",
    placeholder: "menu-sayur.jpg"
  },
  {
    id: "3",
    nama: "Risol Mac & Cheese (3 pcs)",
    deskripsi: "Kombinasi makaroni creamy dengan keju lumer yang gurih berlimpah.",
    harga: 20000,
    gambar: "images/Risol Mac&Cheese.png",
    placeholder: "menu-mac.jpg"
  },
  {
    id: "4",
    nama: "Risol Beef Mayo (3 pcs)",
    deskripsi: "Daging sapi asap pilihan berpadu saus mayones spesial yang creamy.",
    harga: 20000,
    gambar: "images/Risol Beef Mayo.png",
    placeholder: "menu-beef.jpg"
  },
  {
    id: "5",
    nama: "Risol Bolognese Suir (3 pcs)",
    deskripsi: "Perpaduan saus bolognese asam manis gurih dengan daging suir nikmat.",
    harga: 20000,
    gambar: "images/Risol Bolognese.png",
    placeholder: "menu-bolognese.jpg"
  },
  {
    id: "6",
    nama: "Risol Coklat Lumer Keju (3 pcs)",
    deskripsi: "Isian coklat melimpah yang lumer di lidah berpadu gurihnya keju parut.",
    harga: 18000,
    gambar: "images/Risol Coklat Keju.png",
    placeholder: "menu-coklat.jpg"
  },
  {
    id: "7",
    nama: "Risol Matcha (3 pcs)",
    deskripsi: "Sensasi rasa matcha premium yang manis khas dan memanjakan lidah.",
    harga: 18000,
    gambar: "images/Risol Matcha.png",
    placeholder: "menu-matcha.jpg"
  }
];

// Ambil data menu dari LocalStorage atau pakai menu default bawaan
let daftarMenu = JSON.parse(localStorage.getItem('ulanKitchenMenu')) || menuAwal;

// Fungsi Format Mata Uang Rupiah
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ============ RE-RENDER HALAMAN UTAMA & BACKEND ADMIN ============
function renderMenuUtama() {
  const container = document.getElementById('menuContainer');
  if (!container) return;
  container.innerHTML = '';

  daftarMenu.forEach(item => {
    container.innerHTML += `
      <div class="product-card" data-reveal class="in-view">
        <div class="product-media">
          <div class="image-placeholder menu-img">
            <img src="${item.gambar || '#'}" alt="${item.nama}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="placeholder-text"><span>${item.placeholder || 'no-image.jpg'}</span></div>
          </div>
        </div>
        <div class="product-body">
          <h3>${item.nama}</h3>
          <p>${item.deskripsi}</p>
          <div class="product-foot">
            <span class="price">${formatRupiah(item.harga)}</span>
            <button class="add-btn" aria-label="Add to order">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function renderTabelAdmin() {
  const tbody = document.getElementById('tabelMenuBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  daftarMenu.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${item.nama}</strong></td>
        <td>${formatRupiah(item.harga)}</td>
        <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.deskripsi}</td>
        <td>
          <button class="btn-edit-menu" onclick="aksiEditMenu('${item.id}')">Edit</button>
          <button class="btn-delete-menu" onclick="aksiHapusMenu('${item.id}')">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function simpanKeLocalStorage() {
  localStorage.setItem('ulanKitchenMenu', JSON.stringify(daftarMenu));
  renderMenuUtama();
  renderTabelAdmin();
}

// ============ CORE FITUR ADMIN LOGIC ============
document.addEventListener('DOMContentLoaded', () => {
  renderMenuUtama();

  // Toggle Box Admin Area
  const btnBukaAdmin = document.getElementById('btnBukaAdmin');
  const boxAdmin = document.getElementById('boxAdmin');
  if(btnBukaAdmin && boxAdmin) {
    btnBukaAdmin.addEventListener('click', () => {
      boxAdmin.classList.toggle('hidden');
      if (!boxAdmin.classList.contains('hidden')) {
        renderTabelAdmin();
      }
    });
  }

  // Handle Login Sederhana
  const btnLoginAdmin = document.getElementById('btnLoginAdmin');
  const loginAdminBox = document.getElementById('loginAdminBox');
  const dashboardAdminBox = document.getElementById('dashboardAdminBox');
  
  if(btnLoginAdmin) {
    btnLoginAdmin.addEventListener('click', () => {
      const u = document.getElementById('inputUser').value;
      const p = document.getElementById('inputPass').value;
      
      if(u === 'admin' && p === 'ulan123') {
        loginAdminBox.classList.add('hidden');
        dashboardAdminBox.classList.remove('hidden');
        renderTabelAdmin();
      } else {
        alert('Username atau password salah! (Hint: admin / ulan123)');
      }
    });
  }

  // Handle Logout Admin
  const btnLogoutAdmin = document.getElementById('btnLogoutAdmin');
  if(btnLogoutAdmin) {
    btnLogoutAdmin.addEventListener('click', () => {
      document.getElementById('inputUser').value = '';
      document.getElementById('inputPass').value = '';
      dashboardAdminBox.classList.add('hidden');
      loginAdminBox.classList.remove('hidden');
    });
  }

  // Form Submit Tambah/Edit Menu
  const formMenu = document.getElementById('formMenu');
  if(formMenu) {
    formMenu.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('menuId').value;
      const nama = document.getElementById('menuNama').value;
      const harga = parseInt(document.getElementById('menuHarga').value);
      const deskripsi = document.getElementById('menuDeskripsi').value;
      const gambar = document.getElementById('menuGambar').value;
      const placeholder = document.getElementById('menuPlaceholder').value;

      if(id) {
        // Mode Edit Menu Lama
        daftarMenu = daftarMenu.map(item => item.id === id ? {id, nama, harga, deskripsi, gambar, placeholder} : item);
        document.getElementById('btnSimpanMenu').innerText = 'Simpan Menu';
        document.getElementById('btnBatalEdit').classList.add('hidden');
      } else {
        // Mode Tambah Menu Baru
        const idBaru = Date.now().toString();
        daftarMenu.push({id: idBaru, nama, harga, deskripsi, gambar, placeholder});
      }

      simpanKeLocalStorage();
      formMenu.reset();
      document.getElementById('menuId').value = '';
    });
  }

  // Batal Edit
  const btnBatalEdit = document.getElementById('btnBatalEdit');
  if(btnBatalEdit) {
    btnBatalEdit.addEventListener('click', () => {
      document.getElementById('formMenu').reset();
      document.getElementById('menuId').value = '';
      btnBatalEdit.classList.add('hidden');
      document.getElementById('btnSimpanMenu').innerText = 'Simpan Menu';
    });
  }

  // =============== FITUR BAWAAN ASLI ===============
  // Mobile menu toggle
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if(burger && mobileMenu && mobileClose) {
    burger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Scroll reveal animation
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
});

// Fungsi Global untuk Aksi di Tabel (harus ditaruh di luar DOMContentLoaded)
function aksiEditMenu(id) {
  const item = daftarMenu.find(m => m.id === id);
  if(!item) return;

  document.getElementById('menuId').value = item.id;
  document.getElementById('menuNama').value = item.nama;
  document.getElementById('menuHarga').value = item.harga;
  document.getElementById('menuDeskripsi').value = item.deskripsi;
  document.getElementById('menuGambar').value = item.gambar || '';
  document.getElementById('menuPlaceholder').value = item.placeholder || '';

  document.getElementById('btnSimpanMenu').innerText = 'Update Menu Perubahan';
  document.getElementById('btnBatalEdit').classList.remove('hidden');
  window.scrollTo({
    top: document.getElementById('formMenu').offsetTop - 100,
    behavior: 'smooth'
  });
}

function aksiHapusMenu(id) {
  if(confirm('Apakah Anda yakin ingin menghapus varian menu risoles ini?')) {
    daftarMenu = daftarMenu.filter(m => m.id !== id);
    simpanKeLocalStorage();
  }
}