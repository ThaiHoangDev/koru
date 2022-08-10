import GwHandler from './gwHandler';

class mqttClientSetHandler {
  private handlers: any[];

  constructor() {
    this.handlers = [];
    this.allHandler();
  }

  allHandler = () => {
    this.handlers.push(new GwHandler());
  };

  mqttClientGetHandler = (topic: string) => {
    console.log("xxxxxx", topic, this.handlers[0].topicFormat.test(topic))
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i].topicFormat.test(topic)) {
        console.log('xxxx')
        return this.handlers[i];
      }
    }
    return null;
  };
}

export default mqttClientSetHandler;
