import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  protected storage: Storage;
  protected $changed = new Subject();
  protected $removed = new Subject();
  protected $cleared = new Subject();
  changed = this.$changed.asObservable();
  removed = this.$removed.asObservable();
  cleared = this.$cleared.asObservable();

  constructor() {
    this.storage = localStorage;
  }

  set(key, value) {
    this.storage.setItem(key, value);
    this.$changed.next({key, value});
  }

  get(key, _default = null) {
    return this.storage.getItem(key) || _default;
  }

  remove(key) {
    this.storage.removeItem(key);
    this.$removed.next(key);
  }

  clear() {
    this.storage.clear();
    this.$cleared.next();
  }
}
