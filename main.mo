import List "mo:base/List";
import Debug "mo:base/Debug";
actor Dkeeper {
  //we are creating a new data type to representthe kind of data that will be stored in each of these notes
  public type Note = {
    title: Text;
    content: Text; 
  };
  //Beacuse we need to access this type from the javascript side as well it is a good idea to add public keyword to the front
  //new varibale which is going to be notes 
  //The variable is type of List which is kind a similar to arrays
  //List is going to contain Note type like List.List<Note> it means that it will contain Note type objects inside this list
  //List.nill means it is a empty list nil Note object
  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text){
    //we are creating a newNote of type Note
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };
  // so it is async function and it return an array of Notes 
  //we are not using array we are using List over here because array is serialized and not very efficient on blockchain
  //How we can hold of it when our page loads up?
  public query func readNote() : async [Note] {
      return List.toArray(notes);
      //we are pasing our list over here and convert it into an array of note objects [Note]
  };
  //in order to know which one is remove 
  public func removeNote(id: Nat) {
      let noteTake = List.take(notes, id);
      let noteDrop = List.drop(notes, id + 1);
       notes := List.append(noteTake, noteDrop);
  }
}
//dkeeper.did file makes a bridge between javascript and motoko function so js can use mototko function 