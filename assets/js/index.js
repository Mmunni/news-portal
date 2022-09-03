const loadMore = async () => {
          try{
                const url = `https://openapi.programming-hero.com/api/news/categories`;
                const res = await fetch(url);
                const data = await res.json();
                displayNews(data.data.news_category);
            }
            catch(error){
                    console.log(error);
        }
    }
   
    // display catagories
    const displayNews = catagories => {
     
        const catagoriesSection = document.getElementById('catagories')
        catagoriesSection.innerText = '';
        catagories.forEach(catagory => {
        //  console.log(catagory);
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.innerHTML = `
        <h5 class="px-4 nav-link fw-semi-bold menu" id="displayCatagory" onclick="catagoryItems(${catagory.category_id})">${catagory.category_name}</h5>
        `;
        catagoriesSection.appendChild(li);
        
        });
    }
    const catagoryItems = async (id) => {
        try{
           // start loader
          toogleSpiner(true);
              const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
              const res = await fetch(url);
              const data = await res.json();
              displayCatagoryItems(data.data);
          }
          catch(error){
                  console.log(error);
      }
    }
    
    // display catagory items
    const displayCatagoryItems = catagories => {
      const catagoryItemsContainer = document.getElementById('catagory-items');
         catagoryItemsContainer.innerText = '';
       
        // display number of catagory
         const numberOfCatagory = document.getElementById('number-of-catagory')
          numberOfCatagory.innerHTML = `<h4>${catagories.length} items found for this catagory</h4>`;
        
       //  sort array
         catagories.sort(function(a,b) {return b.total_view - a.total_view});

        catagories.forEach(catagory => {
              console.log(catagory)
          const catagoryItems = document.createElement('div')
          catagoryItems.classList.add("row", "mb-4", "bg-white", "rounded","mx-3")
          catagoryItems.innerHTML = `
         <div class="col-md-4">
         <img src="${catagory.image_url}" class="img-fluid rounded p-3" alt="...">
       </div>
       <div class="col-md-8">
         <div class="card-body">
            <h5 class="card-title pt-3 fw-bold">${catagory.title}</h5>
            <p class="card-text pt-4  text-secondary">${catagory.details.slice(0,300)}...</p>
            <div class="catagory-footer mt-4">
                <ul class="author-area">
                <li><img src="${catagory.author.img}"></li>
                <li><h6>${catagory.author.name ? catagory.author.name : 'N/A'}<span class="text-secondary">${catagory.author.published_date ? catagory.author.published_date : 'N/A'}</span></h6></li>
                </ul>
                <div class="viwer mt-3">
                  <i class="fa-regular fa-eye px-2"><span class="fw-bold"> ${catagory.total_view ? catagory.total_view : 'N/A'}</span></i>
                </div>
                <div class="ratings mt-3" >
                    <ul>
                      <li><i class="fa-regular fa-star d-none d-sm-block"></i></li>
                      <li><i class="fa-regular fa-star d-none d-sm-block"></i></li>
                      <li><i class="fa-regular fa-star d-none d-sm-block"></i></li>
                      <li><i class="fa-regular fa-star d-none d-sm-block"></i></li>
                      <li><i class="fa-solid fa-star-half-stroke	d-none d-sm-block"></i></li>
                    </ul>
                  </div>
                  <button class="details  border border-0 bg-white" onclick="catagoryDetails('${catagory._id}')" data-bs-toggle="modal" data-bs-target="#modal"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
         </div>
       </div>
          `;
          catagoryItemsContainer.appendChild(catagoryItems);
    });
    // stop loader
     toogleSpiner(false);
    }
    // spinner
    const toogleSpiner = isLoading =>{
      const spinner = document.getElementById('spinner')
      if(isLoading){
        spinner.classList.remove('d-none')
      }
      else{
        spinner.classList.add('d-none')
      }
    }
    // catagory details
    const catagoryDetails = async (id) => {
      try{
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      displayCatagoryDetails(data.data[0])
      }
      catch(error){
        console.log(error)
      }
    }
    const displayCatagoryDetails = (catagory) => {
      console.log(catagory)
      const showModal = document.getElementById('modalLabel')
      showModal.innerText = `${catagory.title}`;
      const modalDetails = document.getElementById('modal-details')
      modalDetails.innerHTML = `
      <img src="${catagory.image_url}" class="img-fluid rounded p-3" alt="...">
      <p>${catagory.details}</p>
      <div class="catagory-footer mt-4">
                <ul class="author-area">
                <li><img src="${catagory.author.img}"></li>
                <li><h6>${catagory.author.name ? catagory.author.name : 'N/A'}<span class="text-secondary">${catagory.author.published_date ? catagory.author.published_date : 'N/A'}</span></h6></li>
                </ul>
          </div>      
      `;
    }
    
     loadMore('');
     catagoryItems(01);