/**
 * Created by Bart on 7-4-2017.
 */
import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-test',
  template: `
    <h1>Home</h1>
    <span>It works!</span>
  `
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
