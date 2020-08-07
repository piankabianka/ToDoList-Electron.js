  
document.addEventListener('DOMContentLoaded', function(){

    //---------ADD A TASK
    
        const tasksToDoToAdd = [];
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
            
            tasksToDoToAdd.push(li);
    
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
            for(task of tasksToDoToAdd){
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

            const tasksToDo=listToDo.getElementsByTagName('li');
            tasksToDoArray=[];

            const tasksInProgress=listInProgress.getElementsByTagName('li');
            tasksInProgressArray=[];

            const tasksDone=listDone.getElementsByTagName('li');
            tasksDoneArray=[];

            Array.from(tasksToDo).forEach(function(task){
                tasksToDoArray.push(task.textContent);
            })

            Array.from(tasksInProgress).forEach(function(task){
                tasksInProgressArray.push(task.textContent);
            })

            Array.from(tasksDone).forEach(function(task){
                tasksDoneArray.push(task.textContent);
            })

            var fs=require('fs');

            const jsnContent1=JSON.stringify(tasksToDoArray);
            const jsnContent2=JSON.stringify(tasksInProgressArray);
            const jsnContent3=JSON.stringify(tasksDoneArray);



            fs.writeFile("./tasksToDo.json", jsnContent1, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })

            fs.writeFile("./tasksInProgress.json", jsnContent2, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })

            fs.writeFile("./tasksDone.json", jsnContent3, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("saved!");
            })


        })
    
    })