import {MatPaginator, PageEvent} from '@angular/material';
import {AfterContentChecked, Component} from '@angular/core';

@Component({
  selector: 'app-my-paginator',
  templateUrl: 'app.utilities.mypaginator.component.html',
  styleUrls: ['app.utilities.mypaginator.component.css']
})

export class MyPaginatorComponent extends MatPaginator implements AfterContentChecked {
  private readonly PREV_STR = 'Previous';
  private readonly NEXT_STR = 'Next';
  private readonly NUM_PAGES_SHOWN = 3;
  private paginatorButtons = [];

  ngAfterContentChecked() {
    this.updatePaginatorButtons();
  }

  updatePaginatorButtons() {
    this.paginatorButtons = [];

    if (this.hasPreviousPage()) {
      this.paginatorButtons.push(this.PREV_STR);
    }
    const firstIndexPage = Math.max(this.pageIndex - Math.floor(this.NUM_PAGES_SHOWN / 2), 0);
    const lastIndexPage = Math.min(firstIndexPage + this.NUM_PAGES_SHOWN - 1, this.getNumberOfPages());
    for (let i = firstIndexPage; i <= lastIndexPage; i++) {
      this.paginatorButtons.push((i + 1).toString());
    }
    if (this.hasNextPage()) {
      this.paginatorButtons.push(this.NEXT_STR);
    }
  }

  goPage(button: string) {
    switch (button) {
      case this.PREV_STR:
        if (this.hasPreviousPage()) {
          this.previousPage();
        }
        break;
      case this.NEXT_STR:
        if (this.hasNextPage()) {
          this.nextPage();
        }
        break;
      default:
        this.pageIndex = Number.parseInt(button) - 1;
        break;
    }
    this.emitPageEvent();
  }

  emitPageEvent() {
    const event: PageEvent = {
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.page.emit(event);
    // this.updatePaginatorButtons();
  }

  isSelected(button: string): boolean {
    const pageIndex = Number.parseInt(button) - 1;
    return (this.pageIndex === pageIndex);
  }
}
