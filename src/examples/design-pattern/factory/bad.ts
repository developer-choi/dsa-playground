export {};

class ApplePay {
  pay(amount: number) {
    console.log(`애플페이로 ${amount} 결제 했음`);
  }
}

class SamsungPay {
  make_a_payment(value: number) {
    console.log(`삼성페이로 ${value} 결제 했음`);
  }
}

class HyundaePay {
  disburse(money: number) {
    console.log(`현대페이로 ${money} 결제 했음`);
  }
}

/**
 * @description 여러 페이지에서 결제할 때 호출하는 공통 함수
 *
 * 문제 > 새로운 페이가 추가되면, if-else 쌍에서 하나를 추가해야함.
 * - 조건문 절차가 수정되는거기 때문에, 이전 존건문, 이후 조건문을 다시 살펴봐야함. 조건문은 서로 영향을 받으니까 (순서도 중요한게 조건문임;;).
 * ==> OCP 원칙 위반.
 */
function payment(amount: number, method: string) {
  if (method === 'Apple') {
    const payMethod = new ApplePay();
    payMethod.pay(amount);

  } else if(method === 'Samsung') {
    const payMethod = new SamsungPay();
    payMethod.make_a_payment(amount);

  } else if (method === 'Hyundae') {
    const payMethod = new HyundaePay();
    payMethod.disburse(amount);
  } else {
    throw new Error('지원하지 않는 결제수단입니다.');
  }
}
