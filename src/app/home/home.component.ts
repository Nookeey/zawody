import { CompetitionService } from './../core/services/competition.service';
import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
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

  public competitionArray = ['A', 'B'];

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

  ngAfterViewInit() {}

  // ============================================================
  getParticipant() {
    return this.participantService.getParticipant();
  }

  createParticipant() {
    this.participant.name = this.participantForm.value.name;
    this.participant.total = 0;
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
    this.setTotal();
  }

  // ============================================================
  setTotal() {
    let t = 0;
    this.participantService.getParticipant().subscribe(p => {
      p.forEach(e => {
        if (e.points !== undefined) {
          for (let i = 0; i < this.competitionArray.length; i++) {
            if (e.points[this.competitionArray[i]] !== undefined) {
              t += Number(e.points[this.competitionArray[i]].points);
            }
          }
        }
        this.participantService.updateTotal(e.key, t);
        t = 0;
      });
    });
  }

}
