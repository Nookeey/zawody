import { CompetitionService } from './../core/services/competition.service';
import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, ContentChild, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../core/models/participant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Points } from '../core/models/points';
import { PointsService } from '../core/services/points.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public showAddPointsForm: boolean;
  public showEditPointsForm: boolean;

  public participant$: Observable<Participant[]>;
  public competition$: Observable<Competition[]>;
  public points$: Observable<Points[]>;

  private participant = new Participant();
  private competition = new Competition();
  private points = new Points();

  public participantForm: FormGroup;
  public competitionForm: FormGroup;
  public addPointsForm: FormGroup;
  public editPointsForm: FormGroup;

  public key_p: string;
  public key_c: string;
  public points_key: string;


  @ViewChild('ul') ul;
  // @ViewChild('li') li;
  @ViewChildren('li') lis: QueryList<HomeComponent>;

  public items = [];
  public thpoints = [];
  public total = [];

  constructor(
    private participantService: ParticipantService,
    private competitionService: CompetitionService,
    private pointsService: PointsService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.items =
    [
      { id: '1', name: 'Aaaa', points:
        [
          { name: 'Karne', value: 2 },
          { name: 'Kosz', value: null },
          { name: 'Piłakarzyki', value: 3 },
          { name: 'Bilard', value: 1 },
        ]
      },
      { id: '2', name: 'Bbbb', points:
        [
          { name: 'Karne', value: 3 },
          { name: 'Kosz', value: 2 },
          { name: 'Piłakarzyki', value: 4 },
          { name: 'Bilard', value: 5 },
        ]
      },
      { id: '3', name: 'Cccc', points:
        [
          { name: 'Karne', value: 4 },
          { name: 'Kosz', value: 1 },
          { name: 'Piłakarzyki', value: 3 },
          { name: 'Bilard', value: 2 },
        ]
      },
      { id: '4', name: 'Dddd', points:
        [
          { name: 'Karne', value: 1 },
          { name: 'Kosz', value: 2 },
          { name: 'Piłakarzyki', value: 4 },
          { name: 'Bilard', value: 2 },
        ]
      },
    ];

    this.showAddPointsForm = false;
    this.showEditPointsForm = false;

    this.participantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.competitionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.addPointsForm = new FormGroup({
      v_points: new FormControl(null),
    });

    this.editPointsForm = new FormGroup({
      e_points: new FormControl(null),
    });

    this.participant$ = this.getParticipant();
    this.competition$ = this.getCompetition();
    this.points$ = this.getPoints();
  }

  ngAfterViewInit() {
    let suma = 0;
    if (this.items.length !== 0) {
      this.items[0].points.forEach(e => {
        this.thpoints.push(e.name);
      });

      this.items.forEach(e => {
        e.points.forEach(p => {
          console.log(p.value);
          suma = suma + p.value;
        });
        this.total.push(suma);
        suma = 0;
      });
      console.log(this.total);
    }

    this.el.nativeElement.querySelector('input').focus();


    // this.renderer.setStyle(this.li.nativeElement, 'color', '#00ff00');
    this.lis.forEach((li) => {
    });


    // console.log(this.items);
  }

  setKeysAndShowFrom(key_p, key_c) {
    if (this.showEditPointsForm) {
      this.showEditPointsForm = false;
    }
    this.showAddPointsForm = true;
    this.key_p = key_p;
    this.key_c = key_c;
  }

  setKeyPointsAndShowForm(points_key) {
    if (this.showAddPointsForm) {
      this.showAddPointsForm = false;
    }
    this.showEditPointsForm = true;
    this.points_key = points_key;
    console.log(this.points_key);
  }

  // ============================================================
  getParticipant() {
    return this.participantService.getParticipant();
  }

  createParticipant() {
    this.participant.name = this.participantForm.value.name;
    this.participantService.create(this.participant);
    this.participantForm.reset();
  }

  // ============================================================
  getCompetition() {
    return this.competitionService.getCompetition();
  }

  createCompetition() {
    this.competition.name = this.competitionForm.value.name;
    this.competitionService.createCompetition(this.competition);
    this.competitionForm.reset();
  }

  // ============================================================
  getPoints() {
    return this.pointsService.getPoints();
  }

  addPoints() {
    this.points.key_p = this.key_p;
    this.points.key_c = this.key_c;
    this.points.value = this.addPointsForm.value.v_points;
    this.pointsService.addPoints(this.points);
    this.showAddPointsForm = false;
    this.addPointsForm.reset();
  }

  editPoints() {
    this.points.key = this.points_key;
    this.points.value = this.editPointsForm.value.e_points;
    this.showEditPointsForm = false;
    this.pointsService.editPoints(this.points);
    this.editPointsForm.reset();
  }

}
