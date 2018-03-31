import {Listener} from './Listener';


export class EventListener {
  private static widthChangeListeners: Listener[] = [];

  constructor() {
    window.onresize = () => {
      // set screenWidth on screen size change
      this.notify(EventListener.widthChangeListeners, window.innerWidth);
    };
  }

  public static onWidthChangeListener(listener: Listener) {
    this.widthChangeListeners.push(listener);
  }

  private notify(listeners: Listener[], data: any) {
    for (const listener of listeners) {
      listener.notify(data);
    }
  }
}
