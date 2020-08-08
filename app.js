  
document.addEventListener('DOMContentLoaded', function(){

    //---------ADD A TASK
    
        const tasksToAdd = [];
        const taskInProgress=[];
        const taskDone=[];
    
        const addForm=document.forms['add-task'];
    
        addForm.addEventListener('submit', function(e){
            e.preventDefault();
    
            const value=addForm.querySelector('input[type="text"]').value;
    
            const list=document.querySelector('#to-do-list ul')
    
            const li=document.createElement('li');
    
            const deleteButton=document.createElement('button');
            deleteButton.classList.add('delete-button');
    
            const moveButton=document.createElement('button');
            moveButton.classList.add('move-button');
    
            li.textContent=value;
            li.appendChild(moveButton);
            li.appendChild(deleteButton);
            
            tasksToAdd.push(li);
    
            addForm.querySelector('input[type="text"]').value="";
        })
    
        addForm.addEventListener('click', function(e){
            if(e.target.className=='submit-button'){
                const addBall = document.querySelector('.add-ball'); 
                addBall.classList.add('add-ball-active');
            }
        })
    
    
    
    //DELETE A TASK
        const list=document.querySelector('#to-do-list ul');
        const listInProgress=document.querySelector('#in-progress-list ul');
        const listDone=document.querySelector('#done-list ul')
    
        list.addEventListener('click', function(e){
            if(e.target.className=='delete-button'){
                const li=e.target.parentElement;
                
                const deleteBall1=document.querySelector('.delete-ball1');
                deleteBall1.classList.add('delete-ball-active'); 
    
    
                list.removeChild(li);
            }
    
            
            if(e.target.className=='move-button'){
                const li=e.target.parentElement;
                
                taskInProgress.push(li);
    
                const ball = document.querySelector('.move-ball');
                ball.classList.add('move-ball-active');
    
                list.removeChild(li);
            }
        })
    
    
        listInProgress.addEventListener('click', function(e){
            if(e.target.className=='delete-button'){
                const li=e.target.parentElement;
    
                const deleteBall2=document.querySelector('.delete-ball2');
                deleteBall2.classList.add('delete-ball-active'); 
    
                listInProgress.removeChild(li);
            }
    
            if(e.target.className=='move-button'){
                const li=e.target.parentElement;
                
                taskDone.push(li);
                const ball = document.querySelector('.move-ball2');
                ball.classList.add('move-ball-active');
                listInProgress.removeChild(li);
            }
            
        })
    
        listDone.addEventListener('click', function(e){
            if(e.target.className=='delete-button'){
                const li=e.target.parentElement;
    
                const deleteBall3=document.querySelector('.delete-ball3');
                deleteBall3.classList.add('delete-ball-active'); 
                listDone.removeChild(li);
            }
    
            
        })
    
        const ball = document.querySelector('.move-ball');
        ball.addEventListener('animationend', (e)=>{
            e.target.classList.remove('move-ball-active');
            const list=document.querySelector('#in-progress-list ul')
            for(task of taskInProgress){
                list.appendChild(task);
            }
        })
    
        const ball2 = document.querySelector('.move-ball2');
        ball2.addEventListener('animationend', (e)=>{
            e.target.classList.remove('move-ball-active');
            const list=document.querySelector('#done-list ul');
            for(task of taskDone){
                list.appendChild(task);
            }
        })
        
        const addBall=document.querySelector('.add-ball');
    
        addBall.addEventListener('animationend', (e)=>{
            e.target.classList.remove('add-ball-active');
            const list=document.querySelector('#to-do-list ul')
            for(task of tasksToAdd){
                list.appendChild(task);
            }
        })
    
        const deleteBall1=document.querySelector('.delete-ball1');
        deleteBall1.addEventListener('animationend', (e)=>{
            e.target.classList.remove('delete-ball-active');
        })
    
        const deleteBall2=document.querySelector('.delete-ball2');
        deleteBall2.addEventListener('animationend', (e)=>{
            e.target.classList.remove('delete-ball-active');
        })
    
        const deleteBall3=document.querySelector('.delete-ball3');
        deleteBall3.addEventListener('animationend', (e)=>{
            e.target.classList.remove('delete-ball-active');
        })
        

        const saveButton=document.querySelector('#save-button');

        saveButton.addEventListener('click', function(e){
            e.preventDefault();
            const listToDo=document.querySelector('#to-do-list ul');
            const listInProgress=document.querySelector('#in-progress-list ul');
            const listDone=document.querySelector('#done-list ul');

            const tasksToDoToDo=listToDo.getElementsByTagName('li');
            tasksToDoArray=[];

            const tasksToDoInProgress=listInProgress.getElementsByTagName('li');
            tasksInProgressArray=[];

            const tasksToDoDone=listDone.getElementsByTagName('li');
            tasksDoneArray=[];

            Array.from(tasksToDoToDo).forEach(function(task){
                tasksToDoArray.push(task.textContent);
            })

            Array.from(tasksToDoInProgress).forEach(function(task){
                tasksInProgressArray.push(task.textContent);
            })

            Array.from(tasksToDoDone).forEach(function(task){
                tasksDoneArray.push(task.textContent);
            })

            var fs=require('fs');

            const jsnContent1=JSON.stringify(tasksToDoArray);
            const jsnContent2=JSON.stringify(tasksInProgressArray);
            const jsnContent3=JSON.stringify(tasksDoneArray);



            fs.writeFileSync("./tasksToDo.json", jsnContent1, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })

            fs.writeFileSync("./tasksInProgress.json", jsnContent2, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })

            fs.writeFileSync("./tasksDone.json", jsnContent3, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })


        })
    

        const importButton=document.querySelector('#import-button');

        importButton.addEventListener('click', function(e){
            e.preventDefault();

            var fs=require('fs');

            const dataToDo=fs.readFileSync('tasksToDo.json','utf8');
            const tasksToDo=Array.from(JSON.parse(dataToDo));
            
            const dataInProgress=fs.readFileSync('tasksInProgress.json','utf8');
            const tasksInProgress=Array.from(JSON.parse(dataInProgress));
            
            const dataDone=fs.readFileSync('tasksDone.json','utf8');
            const tasksDone=Array.from(JSON.parse(dataDone));


            for(task of tasksToDo){
                const li=document.createElement('li');
                const deleteButton=document.createElement('button');
                deleteButton.classList.add('delete-button');
                const moveButton=document.createElement('button');
                moveButton.classList.add('move-button');

                li.textContent=task;
                li.appendChild(moveButton);
                li.appendChild(deleteButton);
                list.appendChild(li);
            }

            for(task of tasksInProgress){
                const li=document.createElement('li');
                const deleteButton=document.createElement('button');
                deleteButton.classList.add('delete-button');
                const moveButton=document.createElement('button');
                moveButton.classList.add('move-button');

                li.textContent=task;
                li.appendChild(moveButton);
                li.appendChild(deleteButton);
                listInProgress.appendChild(li);
            }

            for(task of tasksDone){
                const li=document.createElement('li');
                const deleteButton=document.createElement('button');
                deleteButton.classList.add('delete-button');
            

                li.textContent=task;
                li.appendChild(deleteButton);
                listDone.appendChild(li);
            }

            

        })
    })