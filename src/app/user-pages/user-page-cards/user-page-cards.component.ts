import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/User'
import { Card } from '../../model/Card'
import { Player } from '../../model/Player'
import { UserService } from '../../service/user.service';
import teamsJson from '../../../assets/clubs/clubs.json';
import countriesJson from '../../../assets/nations/countries.json';

@Component({
  selector: 'app-user-page-cards',
  templateUrl: './user-page-cards.component.html',
  styleUrls: ['./user-page-cards.component.scss']
})
export class UserPageCardsComponent implements OnInit{
  id: any | undefined;
  user: User | undefined;
  ownedCards: Card[] = [];
  card: Card | undefined;
  cards: Card[] = []
  player: Player | undefined;
  pageNr: number = 0;
  nrOfPages: number = 0;
  cardsPerPage: number = 10;
  facePath: string[] = [];
  facesPath: string = "../../assets/faces/";
  badgesPath: string = "../../assets/clubs/png140px/";
  badgePath: string[] = [];
  teamId: number = 0;
  code: string = "";
  flagsPath: string = "../../assets/nations/png100px/";
  flagPath: string[] = [];
  playerName: string = "";
  cardColor: string = "";
  cardColorPath: string[] = [];
  cardIndex: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.pageNr = 0;
    this.id = localStorage.getItem("id");
    this.userService.findById(this.id).subscribe((res) => {
      this.user = res;
      this.ownedCards = this.user.ownedCards;
      this.ownedCards = this.user.ownedCards.sort((a, b) => ((a.overall as number) > (b.overall as number) ? -1 : 1));
      this.nrOfPages = this.ownedCards.length / this.cardsPerPage;
      this.selectCards();   
     },
    (_error) => {

    });
  }

  ngOnDestroy(): void{
    this.cards = [];
    this.ownedCards = [];
  }

  teamToID(teamName: string = ""): number{
    return teamsJson.find((t) => t.Name == teamName)?.ID as number;
  }

  nationalityToCode(nationality: string = ""): string{
    return countriesJson[nationality as keyof typeof countriesJson].toLowerCase();
  }

  selectCards(){
    console.log("ownedCards.length: " + this.ownedCards.length);
    console.log("nrOfPages: " + this.nrOfPages);
    console.log("pageNr: " + this.pageNr);
    if (this.pageNr < this.nrOfPages){
      let k = 0;
      for (let i = 0; i < this.cardsPerPage; i++){
        
        if(i == this.ownedCards.length){
          break;
        }
        this.cards[k] =  this.ownedCards[this.pageNr * this.cardsPerPage + i];
        
        //change cardIndex
        this.cardIndex = k;
        //get player
        this.player = this.cards[k].player as Player;
        //get card color
        this.cardColor = this.cards[k].color as string;
        this.cardColorPath[k] = "../../../assets/cards/" + this.cardColor + ".png";
        console.log(this.cardColorPath);
        // get face based on id
        this.facePath[k] = this.facesPath + this.cards[k].id?.toString() as string + "-" + this.cards[k].player?.name + ".png";
        console.log(this.facePath);
        // get badge based on id
        this.teamId = this.teamToID(this.cards[k].player?.team);
        console.log("Team name: " + this.cards[k].player?.team);
        console.log("Team id: " + this.teamId);
        this.badgePath[k] = this.badgesPath + this.teamId + ".png";
        // get flag based on id
        this.code = this.nationalityToCode(this.cards[k].player?.nationality);
        console.log("Nationality: " + this.cards[k].player?.nationality);
        console.log("Code: " + this.code);
        this.flagPath[k] = this.flagsPath + this.code + ".png";
        // get player name
        this.playerName = this.cards[k].player?.name as string;
        if (this.playerName.length > 10){
          this.playerName = this.playerName.slice(0, 10) + ".";
        }
        k++;
      }
    }
  }

  applyCardStyles(k: number) {
    let url: string = "url(" + this.cardColorPath[k] + ")";
    const styles = {'background-image' : url};
    return styles; 
  }
  
  nextPage() {
    if (this.pageNr + 1 <= this.nrOfPages){      
      this.pageNr++;
      console.log(this.pageNr);
      console.log(this.nrOfPages);
      this.selectCards();
    }
  }

  prevPage() {
    if (this.pageNr - 1 >= 0){
      this.pageNr--;
      this.selectCards();
    }
  }

}


