import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { AuthService } from 'app/core/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger/logger.service';
import { KB } from 'app/models/kbsettings-model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {
  public newKb: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null)
  
  SERVER_BASE_PATH: string;
  TOKEN: string;
  user: any;
  project_id: any;

  constructor(
    public appConfigService: AppConfigService,
    private auth: AuthService,
    private httpClient: HttpClient,
    private logger: LoggerService
  ) { 
    this.auth.user_bs.subscribe((user) => {
      this.user = user;
      this.checkIfUserExistAndGetToken()
    });
    this.getCurrentProject();
    this.getAppConfig();
  }
  // ******************************************
  // ********** INITIALIZING SERVICE **********
  // ***************** START ******************
  checkIfUserExistAndGetToken() {
    if (this.user) {
      this.TOKEN = this.user.token
    } else {
      this.logger.log('[OPENAIKBS.SERVICE] - No user signed in');
    }
  }

  getAppConfig() {
    this.SERVER_BASE_PATH = this.appConfigService.getConfig().SERVER_BASE_URL;
  }

  getCurrentProject() {
    this.logger.log("get current project")
    this.auth.project_bs.subscribe((project) => {
      if (project) {
        this.project_id = project._id
      }
    }, (error) => {
      this.logger.log("get current project ERROR: ", error)
    }, () => {
      this.logger.log("*COMPLETE*")
    });
  }

  // ******************************************
  // ********** INITIALIZING SERVICE **********
  // ***************** END ********************

  // getKbSettings() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.TOKEN
  //     })
  //   }
  //   const url = this.SERVER_BASE_PATH + this.project_id + "/kb";
  //   //const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings";
  //   this.logger.log("[KNOWLEDGE BASE SERVICE] - get settings URL ", url);
  //   return this.httpClient.get(url, httpOptions);
  // }
  areNewwKb(areNewKb: boolean) {
    this.logger.log("[KNOWLEDGE BASE SERVICE] - areNew ", areNewKb);
    this.newKb.next(areNewKb)
  }

  getKbSettingsPrev() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    //const url = this.SERVER_BASE_PATH + this.project_id + "/kb";
    const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings";
    this.logger.log("[KNOWLEDGE BASE SERVICE] - get settings URL ", url);
    return this.httpClient.get(url, httpOptions);
  }

  saveKbSettings(kb_settings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    const url = this.SERVER_BASE_PATH + this.project_id + "/kb/" + kb_settings._id;
    // const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings/" + kb_settings._id;
    this.logger.log("[KNOWLEDGE BASE SERVICE] - save settings URL ", url);
    return this.httpClient.put(url, kb_settings, httpOptions);
  }

  saveKbSettingsPrev(kb_settings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    //const url = this.SERVER_BASE_PATH + this.project_id + "/kb/" + kb_settings._id;
    const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings/" + kb_settings._id;
    this.logger.log("[KNOWLEDGE BASE SERVICE] - save settings URL ", url);
    return this.httpClient.put(url, kb_settings, httpOptions);
  }

  // getListOfKb() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.TOKEN
  //     })
  //   }
  //   const url = this.SERVER_BASE_PATH + this.project_id + "/kb";
  //   //const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings";
  //   this.logger.log("[KNOWLEDGE BASE SERVICE] - get settings URL ", url);
  //   return this.httpClient.get(url, httpOptions);
  // }

  getListOfKb(params?) {
    //let params = "?limit=1&page=0&direction=-1&sortField=updatedAt";
    //let urlParams = params?params:'';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    const url = this.SERVER_BASE_PATH + this.project_id + "/kb" + params;
    //const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings";
    this.logger.log("[KNOWLEDGE BASE SERVICE] - get settings URL ", url);
    return this.httpClient.get(url, httpOptions);
  }


  addKb(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    const url = this.SERVER_BASE_PATH + this.project_id + "/kb";
    this.logger.log("[KNOWLEDGE BASE SERVICE] - add new kb URL ", url);
    return this.httpClient.post(url, JSON.stringify(body), httpOptions); 
  }

  deleteKb(data: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      }), 
      //body: JSON.stringify(data)
    }
    //const url = this.SERVER_BASE_PATH + this.project_id + "/kb/delete/";
    const url = this.SERVER_BASE_PATH + this.project_id + "/kb/"+data.id;
    this.logger.log("[KNOWLEDGE BASE SERVICE] - delete kb URL ", url);
    return this.httpClient.delete(url, httpOptions);
  }

  deleteKbPrev(settings_id: string, id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      }), 
      //body: JSON.stringify(data)
    }
    // https://api.tiledesk.com/v3/649007cf2b0ceb0013adb39a/kbsettings/6581af98e677a60013cdccbe/65c4abc25fc7b7001300069a

    const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings/"+settings_id+"/"+id;
    // const url = this.SERVER_BASE_PATH + this.project_id + "/kb/"+data.id;
    this.logger.log("[KNOWLEDGE BASE SERVICE] - delete kb URL ", url);
    return this.httpClient.delete(url, httpOptions);
  }


  addNewKbPrev(settings_id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN
      })
    }
    const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings/" + settings_id;
    //const url = this.SERVER_BASE_PATH + this.project_id + "/kb";
    this.logger.log("[KNOWLEDGE BASE SERVICE] - add new kb URL ", url);
    return this.httpClient.post(url, JSON.stringify(body), httpOptions); 
  }


  // deleteKb(settings_id: string, kb_id: string){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.TOKEN
  //     })
  //   }
  //   //const url = this.SERVER_BASE_PATH + this.project_id + "/kb/" + kb_id;
  //   const url = this.SERVER_BASE_PATH + this.project_id + "/kbsettings/" + settings_id + "/" + kb_id;
  //   this.logger.log("[KNOWLEDGE BASE SERVICE] - delete kb URL ", url);
  //   return this.httpClient.delete(url, httpOptions);
  // }

  

}
