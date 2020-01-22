//Ready Function untuk button Handler
$(document).ready(function() {
	//LoginButton Handler
	$('#liffLoginButton').on('click', function() {
		if(!liff.isLoggedIn()) {
			liff.login();
		}
	});
	//Logout Button Handler
	$('#liffLogoutButton').on('click', function() {
		if (liff.isLoggedIn()) {
			liff.logout();
		}
	});
	//Add Data Button Handler
	$('#add_button>a').on('click', function() {
		$('#list_data').addClass('hidden');
		$('#tambah_data').removeClass('hidden');
		$('#add_button').hide();
	});
	//Simpan Data
	$('#simpan_button').on('click', function() {
		createData();
		readData();
		$('#list_data').removeClass('hidden');
		$('#tambah_data').addClass('hidden');
		$('#add_button').show();
	})
	//Keluar dari form edit dan tambah data
	$('.cancel_button').on('click', function() {
		$('#list_data').removeClass('hidden');
		$('#edit_data').addClass('hidden');
		$('#tambah_data').addClass('hidden');
		readData();
		$('#add_button').show();
	});
	//Update Data
	$('#edit_button').on('click', function() {
		updateData();
		readData();
		$('#list_data').removeClass('hidden');
		$('#edit_data').addClass('hidden');
		$('#add_button').show();
	});
});

//284672

function createData() {
	// Simpan Data
	tanggal = $('#tambah_tanggal').val();
	status = $('#tambah_status').val();
	keterangan = $('#tambah_keterangan').val();
	jumlah = $('#tambah_jumlah').val();

	if(localStorage.data_uang && localStorage.id_data) {
		//Mengubah data ke format JSON
		data_uang = JSON.parse(localStorage.getItem('data_uang'));
		//Mengambil id_data dan mnegubahnya menjadi int
		id = parseInt(localStorage.getItem('id_data'));
	} else {
		//Membuat array data baru 
		data_uang = [];
		id = 0;
	}

	//Increment id_data
	id++;
	//PUSH data ke array data_uang
	data_uang.push({
			'id_data' : id,
			'tanggal' : tanggal,
			'status' : status,
			'keterangan' : keterangan,
			'jumlah' : jumlah
		});
	//Menyimpan data dari array data_uang ke localStorage
	//JSON.stringify digunakan untuk mengubah tipe data menjadi string
	localStorage.setItem('data_uang', JSON.stringify(data_uang));
	localStorage.setItem('id_data', id);
	//Reset Form
	document.getElementById('form_tambah').reset();
}

function readData() {
	if(localStorage.data_uang && localStorage.id_data) {
		//Parse Data
		data_uang = JSON.parse(localStorage.getItem('data_uang'));
		var data_tampil = "Tidak Ada Data";
		//Mengisi variabel data_tampil
		if (data_uang.length > 0) {
			data_tampil = '<table class=""> <thead> <tr>';
			data_tampil += '<th> Tanggal </th>' +
						'<th> Status </th>' +
						'<th> Ket. </th>' +
						'<th> Jumlah </th>' +
						'<th> Action </th>' +
						'</tr> </thead> <tbody>';
			for (i in data_uang) {
				data_tampil += '<tr>';
				data_tampil += '<td>' + data_uang[i].tanggal + '</td>' +
							'<td>' + data_uang[i].status + '</td>' +
							'<td>' + data_uang[i].keterangan + '</td>' +
							'<td>' + data_uang[i].jumlah + '</td>' +
							'<td>' + 
								'<a href="javascript:void(0);" onclick="deleteData(' + data_uang[i].id_data + ')"> Hapus </a>' +
								'| <a href="javascript:void(0);" onclick="lihatById(' + data_uang[i].id_data + ')"> Update </a>' +
							'</td>';
				data_tampil += '</tr>';
			}
			data_tampil += ' </tbody></table>'
		} else {
			data_tampil = "Tidak Ada Data";
		}
		$('#list_data').html(data_tampil);
	}
}

function updateData() {
	id = parseInt($('#edit_id').val());
	tanggal = $('#edit_tanggal').val();
	status = $('#edit_status').val();
	keterangan = $('#edit_keterangan').val();
	jumlah = $('#edit_jumlah').val();
	idx = 0;
	console.log(data_uang);

	for (i in data_uang) {
		if (data_uang[i].id_data == id) {
			data_uang.splice(idx, 1);
			data_uang.push({
					'id_data' : id,
					'tanggal' : tanggal,
					'status' : status,
					'keterangan' : keterangan,
					'jumlah' : jumlah
				}); 
		}
		idx++
	}

	localStorage.setItem('data_uang', JSON.stringify(data_uang));
	//Reset Form
	document.getElementById('form_edit').reset(); 
}

function deleteData(id) {
	if(localStorage.data_uang && localStorage.id_data) {
		//Mengambil Data
		data_uang = JSON.parse(localStorage.getItem('data_uang'));

		idx = 0;
		
		for (i in data_uang) {
			if (data_uang[i].id_data == id) {
				data_uang.splice(idx, 1);
			}
			idx++;
		}

		//Menyimpan Data
		localStorage.setItem('data_uang', JSON.stringify(data_uang));
		readData();
		$('#add_button').show();
	}
}

function lihatById(id) {
	if(localStorage.data_uang && localStorage.id_data) {
		$('#add_button').hide();
		//Mengambil Data
		data_uang = JSON.parse(localStorage.getItem('data_uang'));
		idx = 0;
		
		for (i in data_uang) {
			if (data_uang[i].id_data == id) {
				$('#edit_id').val(data_uang[i].id_data);
				$('#edit_tanggal').val(data_uang[i].tanggal);
				$('#edit_status').val(data_uang[i].status);
				$('#edit_keterangan').val(data_uang[i].keterangan);
				$('#edit_jumlah').val(data_uang[i].jumlah);
			}
			idx++;
		}

		$('#list_data').addClass('hidden');
		$('#tambah_data').addClass('hidden');
		$('#edit_data').removeClass('hidden');
	}
}