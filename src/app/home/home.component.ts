import { PointsService } from './../core/services/points.service';
import { CompetitionService } from './../core/services/competition.service';
import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../core/models/participant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Points } from '../core/models/points';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public participant$: Observable<Participant[]>;
  public competition$: Observable<Competition[]>;
  public points$: Observable<Points[]>;

  private participant = new Participant();
  private competition = new Competition();
  private points = new Points();

  private participantForm: FormGroup;

  constructor(
    private participantService: ParticipantService,
    private competitionService: CompetitionService,
    private pointsService: PointsService
  ) {}

  ngOnInit() {
    this.participantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.participant$ = this.getParticipant();
    this.competition$ = this.getCompetition();
    this.points$ = this.getPoints();
  }

  // ============================================================
  getParticipant() {
    return this.participantService.getParticipant();
  }

  createParticipant() {
    this.participant.name = this.participantForm.value.name;
    this.participantService.create(this.participant);
    this.onReset();
  }

  onReset() {
    this.participantForm.reset();
  }


  // ============================================================
  getCompetition() {
    return this.competitionService.getCompetition();
  }

  createCompetition() {
    this.competition.name = 'Karne';
    this.competitionService.createCompetition(this.competition);
  }

  // ============================================================
  setPoints(key_participant, key_competition) {
    this.points.key_participant = key_participant;
    this.points.key_competition = key_competition;
    this.points.points = 8;
    console.log(this.points);

    this.pointsService.setPoints(this.points);
  }

  getPoints() {
    return this.pointsService.getPoints();
  }
}
