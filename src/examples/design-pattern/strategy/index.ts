export {};

class PaymentProcessor {
  private strategy: Payment;

  constructor(strategy: Payment) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Payment) {
    this.strategy = strategy;
  }

  // 이후 다른 결제수단이 추가되도 이 클래스의 변경사항이 없아 Payment를 implements한 클래스만 추가하면 되서 OCP를 위반하지않는다.
  processPayment(amount: number) {
    this.strategy.pay(amount);
  }
}

interface Payment {
  pay: (amount: number) => void
}

class CardPayment implements Payment {
  private cvc: string;

  constructor(cvc: string) {
    this.cvc = cvc;
  }

  pay(amount: number) {
    console.log(`신용카드로 ${amount} 결제했습니다.`);
  }
}

class CashPayment implements Payment {
  private expired: Date;

  constructor(expired: Date) {
    this.expired = expired;
  }

  pay(amount: number) {
    console.log(`무통장입금으로 ${amount} 결제했습니다.`);
  }
}

function main() {
  const processor = new PaymentProcessor(new CardPayment('123'));
  processor.processPayment(1000);

  processor.setStrategy(new CashPayment(new Date('2024-12-31')));
  processor.processPayment(1000);
}
