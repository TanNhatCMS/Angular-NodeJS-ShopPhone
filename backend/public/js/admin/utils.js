const getEle = (id) => document.getElementById(id);

export class Helper {
  constructor() {
    this.inpArr = ['name', 'price', 'screen', 'backCam', 'frontCam', 'img', 'desc', 'type'];
    this.tbArr = [
      'tbname',
      'tbprice',
      'tbscreen',
      'tbbackCam',
      'tbfrontCam',
      'tbimg',
      'tbdesc',
      'tbtype',
    ];
  }

  getInputValues() {
    return this.inpArr.map((id) => getEle(id).value);
  }

  fillInputs(arr) {
    this.inpArr.forEach((id, index) => {
      getEle(id).value = arr[index];
    });
  }

  clearTextBoxes() {
    this.tbArr.forEach((id) => {
      getEle(id).innerHTML = '&#8205;';
    });
  }
}

export class CustomModal {
  static alertSuccess(title, message) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  static alertDelete(message) {
    return Swal.fire({
      title: 'Bạn có chắc không?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
    });
  }

  static alertError(title,message) {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
