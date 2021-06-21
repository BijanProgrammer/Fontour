import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';
import Config from '../Config';
import Font from '../../models/Font';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public Config = Config;

    public groups = {};
    public activeGroupKey = 'a';
    public hoveredIndex: number;

    public constructor(private databaseService: DatabaseService) {
        document.addEventListener('keyup', (e) => {
            if (this.hoveredIndex === undefined) return;

            this.groups[e.key].push(this.groups[this.activeGroupKey][this.hoveredIndex]);
            this.groups[this.activeGroupKey].splice(this.hoveredIndex, 1);

            const fonts = [];
            for (const key in this.groups)
                for (const name of this.groups[key])
                    fonts.push(`#${key} ${name}`);

            databaseService.updateFonts(fonts.sort()).then(data => console.log(data)).catch(err => console.error(err));
        });

        for (const key in Config.GROUP_NAMES)
            this.groups[key] = [];
    }

    public ngOnInit(): void {
        this.databaseService.loadSortedFonts().then(data => {
            const fonts: Font [] = data.split('\n')
                .map(x => x.trim())
                .filter(x => x.toString())
                .map(x => new Font(x[1], x.substring(3)));

            for (const font of fonts)
                this.groups[font.group].push(font.name);
        });
    }

    public navigationClickHandler(key: string): void {
        this.activeGroupKey = key;
    }

    public fontMouseOverHandler(index: number): void {
        this.hoveredIndex = index;
    }

    public fontMouseLeaveHandler(): void {
        this.hoveredIndex = undefined;
    }
}
