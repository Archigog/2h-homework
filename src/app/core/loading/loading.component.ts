import { Component, OnInit } from '@angular/core';
import {LoadingService} from "./loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public readonly isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {}
}
