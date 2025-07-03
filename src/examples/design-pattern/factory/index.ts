export {};

interface PaymentMethod {
  pay: (amount: number) => void
}

class ApplePay implements PaymentMethod {
  pay(amount: number) {
    console.log(`애플페이로 ${amount} 결제 했음`);
  }
}

class SamsungPay implements PaymentMethod {
  pay(value: number) {
    console.log(`삼성페이로 ${value} 결제 했음`);
  }
}

class HyundaePay implements PaymentMethod {
  pay(money: number) {
    console.log(`현대페이로 ${money} 결제 했음`);
  }
}

class PaymentFactory {
  private static METHODS = {
    apple: ApplePay,
    samsung: SamsungPay,
    hyundae: HyundaePay,
  };

  /**
   * @description 여러 페이지에서 결제할 때 호출하는 공통 메소드
   *
   * bad 케이스와 비교했을 때 장점으로,
   * (요구사항이 추가되어) 새로운 결제 수단이 추가되더라도 기존 코드에 영향이 전혀 없음.
   */
  static pay(amount: number, method: string) {
    if (!(method in PaymentFactory.METHODS)) {
      throw new Error('지원되지 않는 결제수단입니다.');
    }

    const paymentMethod = new PaymentFactory.METHODS[method as keyof typeof PaymentFactory.METHODS]();
    paymentMethod.pay(amount);
  }
}
