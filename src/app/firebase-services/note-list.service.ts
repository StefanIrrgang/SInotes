import { Injectable, inject, } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubTrash;
  unsubNotes;

  // items$;
  // items;
  // unsubList;

  // unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();

    // this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "34574388gfh32"), (element) => {

    //   });

    // this.unsubList();
    // this.unsubSingle();

    // this.items$ = collectionData(this.getNotesRef());
    // this.items = this.items$.subscribe( (list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // })
    // this.items.unsubscribe();
  }

  ngOnDestroy() {
    // this.items.unsubscribe();
    this.unsubNotes();
    this.unsubTrash();
    // this.unsubSingle();
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = []
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = []
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }

  // const itemCollection = collection(this.firestore, 'items');

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
