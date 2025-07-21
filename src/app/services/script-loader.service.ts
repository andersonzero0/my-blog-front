import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private loadedScripts: { [url: string]: Promise<void> } = {};

  loadScript(url: string): Promise<void> {
    if (!this.loadedScripts[url]) {
      this.loadedScripts[url] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return this.loadedScripts[url];
  }
}