import { Component, OnInit, Input } from '@angular/core';

export enum LoadingType {
    Fullscreen = 'fullscreen',
    Fullparent = 'fullparent',
    Inline = 'inline'
}

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    @Input('type') loadingType = LoadingType.Fullparent;
    @Input() timeout = 0;
    @Input() size = "2x";
    @Input() color = "white";
    @Input('background-color') backgroundColor = 'rgba(128,128,128,0.5)';

    isLoading: boolean;


    ngOnInit() {
    }

    show(timeout = 0) {
        this.isLoading = true;
        if (this.timeout > 0 || timeout > 0) {
            setTimeout(() => {
                this.hide();
            }, timeout > 0 ? timeout : this.timeout);
        }
    }
    hide() {
        this.isLoading = false;
    }

    get isFullscreen() {
        return this.loadingType === LoadingType.Fullscreen;
    }
    get typeclass() {
        switch (this.loadingType) {
            case LoadingType.Fullscreen:
                return 'fullscreen';
            case LoadingType.Fullparent:
                return 'fullparent';
            case LoadingType.Inline:
                return 'inline';
        }
    }


}
