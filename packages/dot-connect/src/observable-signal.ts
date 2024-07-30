import { Signal } from "@lit-labs/preact-signals";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Observable, Subscription } from "rxjs";

class ObservableSignal<TValue, TInitialValue extends TValue | void = void>
  extends Signal<TInitialValue extends void ? TValue | undefined : TValue>
  implements ReactiveController
{
  #observable: Observable<TValue>;

  #subscription: Subscription | undefined;

  constructor(
    host: ReactiveControllerHost,
    observable: Observable<TValue>,
    initialValue?: TInitialValue,
  ) {
    super();
    this.#observable = observable;
    this.value = initialValue as TInitialValue extends void
      ? TValue | undefined
      : TValue;
    host.addController(this);
  }

  hostConnected(): void {
    this.#subscription ??= this.#observable.subscribe({
      next: (value) => (this.value = value),
    });
  }

  hostDisconnected(): void {
    this.#subscription?.unsubscribe();
    this.#subscription = undefined;
  }
}

export const observableSignal = <
  TValue,
  TInitialValue extends TValue | void = void,
>(
  host: ReactiveControllerHost,
  observable: Observable<TValue>,
  initialValue?: TInitialValue,
) => new ObservableSignal(host, observable, initialValue);
