import { CompetitionService } from './../core/services/competition.service';
import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, ContentChild } from '@angular/core';
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

  @ViewChild('navbar') navbar;
  @ViewChild('vcTable') vcTable;
  @ContentChild('vcTable') vcTbody;

  constructor(
    private participantService: ParticipantService,
    private competitionService: CompetitionService,
    private pointsService: PointsService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
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
    this.renderer.addClass(this.navbar.nativeElement, 'active');
    this.renderer.addClass(this.vcTable.nativeElement, 'aaa');
    this.renderer.addClass(this.vcTbody.nativeElement, 'aaa');

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
2  }

  editPoints() {
    this.points.key = this.points_key;
    this.points.value = this.editPointsForm.value.e_points;
    this.showEditPointsForm = false;
    this.pointsService.editPoints(this.points);
    this.editPointsForm.reset();
  }

}
