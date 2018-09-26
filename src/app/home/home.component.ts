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

  public participant$: Observable<any[]>;
  public competition$: Observable<any[]>;
  public points$: Observable<any[]>;

  participantForm: FormGroup;
  participant = new Participant();
  competition = new Competition();
  points = new Points();

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
    this.participantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.participant$ = this.getParticipant();
    // this.createCompetition();
    this.competition$ = this.getCompetition();
    this.points$ = this.getPoints();
    this.getCompetition().subscribe(res => {
      console.log(res);
    });

  }

  // ============================================================
  getParticipant() {
    return this.participantService.getParticipant();
  }

  createParticipant() {
    // this.competition.karne = 0;
    // this.competition.kosz = 0;
    this.participant.name = this.participantForm.value.name;
    // this.participant.competition = this.competition;
    // console.log(this.competition);
    // console.log(this.participant);
    this.participantService.create(this.participant);
    this.onReset();
  }

  onReset() {
    this.participantForm.reset();
  }


  // ============================================================
  getCompetition() {
    return this.participantService.getCompetition();
  }

  createCompetition() {
    this.competition.name = 'Karne';
    this.participantService.createCompetition(this.competition);
  }

  // ============================================================
  setPoints(key_participant, key_competition) {
    // console.log('key_participant: ' + key_participant);
    // console.log('key_competition: ' + key_competition);

    this.points.key_participant = key_participant;
    this.points.key_competition = key_competition;
    this.points.points = 8;
    console.log(this.points);

    this.participantService.setPoints(this.points);
  }

  getPoints() {
    return this.participantService.getPoints();
  }
}
