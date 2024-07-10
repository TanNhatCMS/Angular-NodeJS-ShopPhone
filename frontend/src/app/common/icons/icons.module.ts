import { NgModule } from '@angular/core';
import { allIcons } from 'angular-feather/icons';
import {FeatherModule} from "angular-feather";

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(allIcons)
  ],
  exports: [
    FeatherModule
  ]
})

export class IconsModule { }
