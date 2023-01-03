import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public image: string = 'https://ionicframework.com/docs/icons/feature-component-tabs-icon.png';

  constructor() { }

  async saveImage() {
    try {
      const response: Response = await fetch(this.image);
      const blob: Blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const file = await Filesystem.writeFile({
          data: reader.result as string,
          directory: Directory.Cache,
          path: `${Date.now()}.png`
        });

        console.log(file.uri);

        this.shareImage(file.uri);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(error);
    }
  }

  async shareImage(fileUri: string) {
    try {
      const shareResult = await Share.share({
        dialogTitle: 'Share image',
        url: fileUri
      });

      console.log(shareResult.activityType);
    } catch (error) {
      console.error(error);
    }
  }
}
