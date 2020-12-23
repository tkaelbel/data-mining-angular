import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit {

  @Output() sideNavigationClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onSideNavigationClose = () => {
    this.sideNavigationClose.emit();
  }

}
