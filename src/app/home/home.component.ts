import { CompetitionService } from './../core/services/competition.service';
import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../core/models/participant';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public showSetPointsForm: boolean;

  public participant$: Observable<Participant[]>;
  public competition$: Observable<Competition[]>;

  private participant = new Participant();
  private competition = new Competition();

  public participantForm: FormGroup;
  public competitionForm: FormGroup;
  public setPointsForm: FormGroup;

  public competitionNameArray = [];
  public participantKeyArray = [];

  public selectedParticipant: string;
  public selectedCompetition: string;

  constructor(
    private participantService: ParticipantService,
    private competitionService: CompetitionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.showSetPointsForm = false;

    this.participantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.competitionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.setPointsForm = new FormGroup({
      s_points: new FormControl(null),
    });

    this.participant$ = this.getParticipant();
    this.competition$ = this.getCompetition();
  }

  ngAfterViewInit() {
    // this.reSetTotal();
  }

  // ============================================================
  getParticipant() {
    this.participantService.getParticipant()
      .subscribe(res => res.forEach(r => this.participantKeyArray.push(r.key)));
    return this.participantService.getParticipant();
  }

  createParticipant() {
    this.participant.name = this.participantForm.value.name;
    this.participant.total = 0;
    this.participantService.create(this.participant);
    this.participantForm.reset();
  }

  removeParticipant(key) {
    this.participantService.remove(key);
  }

  // ============================================================
  getCompetition() {
    this.competitionService.getCompetition()
      .subscribe(res => res.forEach(r => this.competitionNameArray.push(r.name)));
    return this.competitionService.getCompetition();
  }

  createCompetition() {
    this.competition.name = this.competitionForm.value.name;
    this.competitionService.createCompetition(this.competition);
    this.competitionForm.reset();
  }

  removeCompetition(key, competition) {
    this.competitionService.remove(key);

    this.participantKeyArray.forEach(k => {
      this.participantService.removePoints(k, competition);
    });
    this.reSetTotal();
  }

  // ============================================================
  setPKeyCName(participantKey, participantName, competitionName) {
    this.participant.key = participantKey;
    this.competition.name = competitionName;
    this.selectedParticipant = participantName;
    this.selectedCompetition = competitionName;
    this.showSetPointsForm = true;
  }

  setPoints() {
    const points = this.setPointsForm.value.s_points;
    this.participantService.setPoints(this.participant.key, this.competition.name, points);

    this.showSetPointsForm = false;
    this.setPointsForm.reset();
    this.setTotal(this.participant.key);
  }

  setTotal(key) {
    let points = [];

    this.participantService.getParticipantPoints(key)
      .subscribe(res => {
        res.forEach(p => {
          points.push(p.points);
        });
        const total = points.reduce((t, p) => t + p, 0);
        this.participantService.updateTotal(key, total);
      });
  }

  reSetTotal() {
    this.participantService.getParticipant()
      .subscribe(res => {
        res.forEach(p => {
          this.setTotal(p.key);
        });
      });
  }

}
