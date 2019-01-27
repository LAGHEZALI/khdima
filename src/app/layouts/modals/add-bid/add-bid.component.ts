import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Bid } from 'src/app/shared/models/bid';
import { BidService } from 'src/app/shared/services/bid.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.scss']
})
export class AddBidComponent implements OnInit {

  period_autoTicks = true;
  period_disabled = false;
  period_invert = false;
  period_max = 10;
  period_min = 1;
  period_showTicks = false;
  period_step = 1;
  period_thumbLabel = true;
  period_value = 0;
  period_vertical = false;

  cost_autoTicks = true;
  cost_disabled = false;
  cost_invert = false;
  cost_max = 5000;
  cost_min = 50;
  cost_showTicks = false;
  cost_step = 50;
  cost_thumbLabel = true;
  cost_value = 0;
  cost_vertical = false;

  periodType = 'h';

  comment = '';

  get period_tickInterval(): number | 'auto' {
    return this.period_showTicks ? (this.period_autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set period_tickInterval(value) {
    this._tickInterval = Number(value);
  }

  get cost_tickInterval(): number | 'auto' {
    return this.cost_showTicks ? (this.cost_autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set cost_tickInterval(value) {
    this._tickInterval = Number(value);
  }

  private _tickInterval = 1;

  constructor(
    public dialogRef: MatDialogRef<AddBidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bidService: BidService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  bid() {
    LoadingService.on();
    LoadingService.update('Envoi de votre demande...', 0);
    const price = this.cost_value;
    const delay = this.period_value + ' ' + this.prettyPeriod();
    const comment = this.comment;
    const postID = this.data;

    const bid = new Bid (
      String(price),
      delay,
      comment,
      postID,
      null,
      'new',
      '',
      '',
      ''
    );
    this.bidService.addBid(bid)
    .then( (newBid) => {
      this.snackBar.open('Demande Envoyé avec succès', 'Fermer', {
        duration: 2000,
      });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally( () => {
      LoadingService.off();
      this.clear();
    });
  }

  clear() {
    this.periodType = 'h';
    this.period_value = 0;
    this.cost_value = 0;
  }

  close(): void {
    this.dialogRef.close();
  }

  onChange(val: string) {
    this.periodType = val;
  }

  prettyPeriod(): string {
    let res;
    switch (this.periodType) {
      case 'h':
        if (this.period_value === 1) {
          res = 'Heure';
        } else {
          res = 'Heures';
        }
        break;
      case 'd':
        if (this.period_value === 1) {
          res = 'Jour';
        } else {
          res = 'Jours';
        }
        break;
      case 'm':
        res = 'Mois';
        break;
    }
    return res;
  }
}
