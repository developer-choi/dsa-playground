export {};

interface Observer {
  id: number;
  receiveVideoAlarm: () => void;
}

abstract class ObserverManager {
  protected readonly subscribers: Observer[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(observer: Observer) {
    if (!this.subscribers.some(({ id }) => id === observer.id)) {
      this.subscribers.push(observer);
    } else {
      console.warn(`Observer with id ${observer.id} is already subscribed.`);
    }
  }

  unsubscribe(observer: Observer) {
    const index = this.subscribers.findIndex(({id}) => id === observer.id);

    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }
}

class YoutubeManager extends ObserverManager {
  createVideo() {
    this.subscribers.forEach(subscriber => {
      subscriber.receiveVideoAlarm();
    });
  }
}

function main() {
  const manager = new YoutubeManager();

  const observer1: Observer = {
    id: 1,
    receiveVideoAlarm: () => {
      console.log(`Observer 1 received video notification`);
    }
  };

  const observer2: Observer = {
    id: 2,
    receiveVideoAlarm: () => {
      console.log(`Observer 2 received video notification`);
    }
  };

  manager.subscribe(observer1);
  manager.subscribe(observer2);
  manager.subscribe(observer1); // 중복 구독 방지 확인

  console.log("=== Sending video notification ===");
  manager.createVideo();

  manager.unsubscribe(observer1);
  console.log("=== After unsubscribing Observer 1 ===");
  manager.createVideo();
}
