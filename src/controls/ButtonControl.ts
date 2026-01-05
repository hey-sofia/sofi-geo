type ButtonControlOptions = {
  label?: string;
  title?: string;
  onClick: (map: mapboxgl.Map, button: HTMLButtonElement) => void;
};

export class ButtonControl implements mapboxgl.IControl {
  private _map?: mapboxgl.Map;
  private _container?: HTMLDivElement;

  private _options: ButtonControlOptions;

  constructor(options: ButtonControlOptions) {
    this._options = options;
  }

  onAdd(map: mapboxgl.Map) {
    this._map = map;

    const container = document.createElement("div");
    container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";

    const button = document.createElement("button");
    button.type = "button";
    button.style.backgroundColor = "#353535";
    button.textContent = this._options.label ?? "Btn";
    if (this._options.title) {
      button.title = this._options.title;
    }

    button.addEventListener("click", () => {
      if (!this._map) return;
      this._options.onClick(this._map, button);
    });

    container.appendChild(button);
    this._container = container;
    return this._container;
  }

  onRemove() {
    if (!this._container) return;
    this._container.parentNode?.removeChild(this._container);
    this._map = undefined;
  }
}
