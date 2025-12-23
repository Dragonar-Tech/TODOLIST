function initializeDarkMode() {
    const darkmode = localStorage.getItem('darkmode');
    const themeSwitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    }
    const disableDarkmode = () => {
                document.body.classList.remove('darkmode');
                localStorage.setItem('darkmode', 'inactive');
            }

            if (darkmode === 'active') {
                enableDarkmode();
            }

            themeSwitch.addEventListener('click', () => {
                const currentMode = localStorage.getItem('darkmode');
                if (currentMode === 'active') {
                    disableDarkmode();
                } else {
                    enableDarkmode();
                }
            });
        }


        let deletedItems = []; 

        function addItem() {
            const newItemText = document.getElementById('newItem').value.trim();

            if (newItemText === "") {
                alert("Please enter a valid task.");
                return;
            }

            const list = document.getElementById('mylist');
            const newItem = document.createElement("li");
            newItem.textContent = newItemText;
            list.appendChild(newItem);
            document.getElementById('newItem').value = '';
        }

        function completeItem() {
            const list = document.getElementById('mylist');
            const items = list.getElementsByTagName('li');

            if (items.length > 0) {
                const lastItem = items[items.length - 1];
                lastItem.classList.toggle('custom-strike');
            } else {
                alert('No items to complete');
            }
        }

        document.getElementById('mylist').addEventListener('click', function(e) {
            if (e.target.tagName === 'LI') {
                e.target.classList.toggle('custom-strike');
            }
        });

        function resetList(listId, className) {
            const list = document.getElementById(listId);
            if (!list) {
                console.warn(`List with ID '${listId}' not found`);
                return;
            }
            const items = list.getElementsByTagName('li');
            for (let item of items) {
                item.classList.remove(className);
                item.style.textDecoration = '';
                item.style.listStyleType = '';
            }

            // Restore deleted items
            deletedItems.forEach(itemText => {
                const newItem = document.createElement("li");
                newItem.textContent = itemText;
                list.appendChild(newItem);
            });
            deletedItems = []; // Clear the deleted items array after restoring
        }

        // Delete struck items
        function deleteList(listId, className) {
            const list = document.getElementById(listId);
            if (!list) {
                alert("Nothing to delete");
                return;
            }
            const items = Array.from(list.getElementsByTagName('li'));
            const itemsToDelete = items.filter(item => item.classList.contains(className));
            
            if (itemsToDelete.length === 0) {
                alert("No completed items to delete. Click on items to mark them as completed first.");
                return;
            }

            itemsToDelete.forEach(item => {
                deletedItems.push(item.textContent); // Store the text content of the deleted item
                list.removeChild(item);
            });
        }
        function openNav(){
            document.getElementById('mySidenav').style.width="250px" ;
        }
        function closeNav(){
            document.getElementById("mySidenav").style.width="0px" ; 
        }

        function showAlert() {
            const alertBox = document.getElementById('alert');  
            alertBox.style.display = 'block';
            setTimeout(() => {  
                alertBox.style.display = 'none';
            }       , 3000);
                
        }

        document.getElementById('newItem').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addItem();
            }
        });

        document.getElementById('add').addEventListener('click', addItem);
        document.getElementById('completed').addEventListener('click', completeItem);
        document.getElementById('reset').addEventListener('click', function() {
            resetList('mylist', 'custom-strike');
        });
        document.getElementById('delete').addEventListener('click', function() {
            deleteList('mylist', 'custom-strike');
        });

        document.addEventListener('DOMContentLoaded', initializeDarkMode);