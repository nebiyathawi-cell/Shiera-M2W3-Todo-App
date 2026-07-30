
const items = document.querySelectorAll(".todo");   
 
 const input = document.getElementById("new-todo");  
  
const form = document.querySelector("#todo-form");
  form.addEventListener("submit", (event) => { 

   event.preventDefault(); 

  const input = form.querySelector("input[name='title']"); 
   addTodo(input.value);  
   form.reset();
});
const list = document.querySelector("#todo-list"); 
list.addEventListener("click", (event) => { 

 const item = event.target.closest("[data-id]"); 
 
  if (!item)
   return; 
   
   const id = item.dataset.id;  
  if (event.target.matches(".delete")) {   
   removeTodo(id); 
   } else if
    (event.target.matches(".check")) {   
     toggleTodo(id);  }
     
     });
     let todos = [];
     let draggedId = null;
 function render() { 
  const list = document.querySelector("#todo-list"); 
   list.replaceChildren(    ...todos.map((t) => { 
       
    const li = document.createElement("li");  
    li.draggable  = true;

  li.addEventListener("dragstart", () => {
    draggedId = t.id;
  console.log("Dragging:", draggedId);
  });
  li.addEventListener("dragover", (e) => {
  e.preventDefault();
});
li.addEventListener("drop", () => {

   const draggedIndex = todos.findIndex(
    todo => todo.id === draggedId
  );

  const droppedIndex = todos.findIndex(
    todo => todo.id === t.id
  );

  const [movedTodo] = todos.splice(draggedIndex, 1);

  todos.splice(droppedIndex, 0, movedTodo);

  render();



});
     li.dataset.id = t.id;     
      li.innerHTML = `       
 <input type="checkbox" class="check" ${t.done ? "checked" : ""} />      
   <span>${t.title}</span>        
   <button class="delete">Delete</button>`;    
     return li;  
       })  
       );} 
       
       
    function addTodo(title) { 
     todos = [...todos, {
      id: crypto.randomUUID(), 
      title, done: false }]; 
       persist(); 
        render();} 
        
      function toggleTodo(id) { 
       todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));  
       persist(); 
        render();
       } 
       
       function removeTodo(id) { 
        todos = todos.filter((t) => t.id !== id); 
         persist(); 
          render();}
          const STORAGE_KEY = "shiera.todos.v1"; 
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
   function hydrate() { 
    const raw = localStorage.getItem(STORAGE_KEY); 
     if (!raw) 
     return;  try {   
      todos = JSON.parse(raw); 
       }
       catch {    
       todos = [];  
       }} hydrate();
       render();