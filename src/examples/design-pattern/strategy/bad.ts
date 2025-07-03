export {};

class PaymentProcessor {
  processPayment(type: 'card' | 'cash', amount: number) {
    // 새로운 결제 수단 추가하면, 이 if else 문 사이에 끼워넣어야 해서 OCP 위반
    if (type === 'card') {
      console.log(`신용카드로 ${amount} 결제했습니다.`);
    } else if (type === 'cash') {
      console.log(`무통장입금으로 ${amount} 결제했습니다.`);
    } else {
      throw new Error('지원되지 않는 결제 수단입니다.');
    }
  }
}

function main() {
  const processor = new PaymentProcessor();
  processor.processPayment('card', 1000);
}
