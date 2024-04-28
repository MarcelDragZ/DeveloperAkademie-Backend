import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'videoflix-data-protection',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="mt-20 text-white m-5">
    <h1 class="text-2xl mb-5 text-red-700">Dataprotection</h1>
    <p>
      Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst.
      Nachfolgend informieren wir Sie daher ausführlich über den Umgang mit
      Ihren Daten auf unserer Clan-Website.
      <br />
      <br />
      Verantwortlicher im Sinne der Datenschutzgesetze ist:
      <br />
      <br />

      Marcel Herzog
      <br />
      Hauptstr. 15
      <br />
      69231 Rauenberg
      <br />
      Postfach-NR: 1131
      <br />
      <br />
      Datenerfassung auf unserer Website
      <br />
      <br />

      a) Beim Besuch unserer Website
      <br />

      Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum
      Einsatz kommenden Browser automatisch Informationen an den Server unserer
      Website gesendet. Diese Informationen werden temporär in einem sog.
      Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun
      erfasst und bis zur automatisierten Löschung gespeichert:
      <br />
      IP-Adresse des anfragenden Rechners Datum und Uhrzeit des Zugriffs Name
      und URL der abgerufenen Datei Website, von der aus der Zugriff erfolgt
      (Referrer-URL) verwendeter Browser und ggf. das Betriebssystem Ihres
      Rechners sowie der Name Ihres Access-Providers Die genannten Daten werden
      durch uns zu folgenden Zwecken verarbeitet: Gewährleistung eines
      reibungslosen Verbindungsaufbaus der Website Gewährleistung einer
      komfortablen Nutzung unserer Website Auswertung der Systemsicherheit und
      -stabilität sowie zu weiteren administrativen Zwecken Die Rechtsgrundlage
      für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser
      berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur
      Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem
      Zweck, Rückschlüsse auf Ihre Person zu ziehen.
      <br />
      <br />

      b) Bei Nutzung unseres Kontaktformulars
      <br />
      Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über
      ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei
      ist die Angabe einer gültigen E-Mail-Adresse sowie Ihres Namens
      erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese
      beantworten zu können. Weitere Angaben können freiwillig getätigt werden.
      Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach
      Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten
      Einwilligung. Die für die Benutzung des Kontaktformulars von uns erhobenen
      personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten
      Anfrage automatisch gelöscht. Weitergabe von Daten Eine Übermittlung Ihrer
      persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten
      Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an
      Dritte weiter, wenn:
      <br />
      Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung
      dazu erteilt haben die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur
      Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
    </p>
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataProtectionComponent {}
