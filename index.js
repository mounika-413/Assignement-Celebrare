document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const addTextBtn = document.getElementById("add-text-btn");
    const textContainer = document.getElementById("text-container");
    const deleteInput=document.getElementById("delete-button");
  
    const undoBtn = document.getElementById("undo-btn");
    const redoBtn = document.getElementById("redo-btn");
  
    const decreaseFontBtn = document.getElementById("decrease-font-btn");
    const increaseFontBtn = document.getElementById("increase-font-btn");
    const boldBtn = document.getElementById("bold-btn");
    const italicBtn = document.getElementById("italic-btn");
    const alignmentBtn = document.getElementById("alignment-btn");
    const underlineBtn = document.getElementById("underline-btn");
  
    let currentText = null;
    let alignmentState = "left";
  
    // Add Text Functionality
    addTextBtn.addEventListener("click", () => {
      const text = textInput.value.trim();
      if (text) {
        const textElement = document.createElement("div");
        textElement.className = "movable-text";
        textElement.textContent = text;
        textElement.style.position = "absolute";
        textElement.style.left = "50%";
        textElement.style.top = "50%";
        textElement.style.transform = "translate(-50%, -50%)";
        textElement.style.cursor = "move"; 
        textContainer.appendChild(textElement);
  
        makeMovable(textElement);
        currentText = textElement;
        textInput.value=""
      }
    });
  
    // Undo Functionality
    undoBtn.addEventListener("click", () => {
        currentText.style.display = "none";
    });
  
    // Redo Functionality
    redoBtn.addEventListener("click", () => {
        currentText.style.display = "block";
    });
  
    // Font Size Adjustment
    increaseFontBtn.addEventListener("click", () => {
      if (currentText) {
        const fontSize = parseInt(window.getComputedStyle(currentText).fontSize);
        currentText.style.fontSize = `${fontSize + 2}px`;
      }
    });
  
    decreaseFontBtn.addEventListener("click", () => {
      if (currentText) {
        const fontSize = parseInt(window.getComputedStyle(currentText).fontSize);
        currentText.style.fontSize = `${Math.max(10, fontSize - 2)}px`;
      }
    });
  
    // Bold Functionality
    boldBtn.addEventListener("click", () => {
      if (currentText) {
        currentText.style.fontWeight =
          currentText.style.fontWeight === "bold" ? "normal" : "bold";
      }
    });
  
    // Italic Functionality
    italicBtn.addEventListener("click", () => {
      if (currentText) {
        currentText.style.fontStyle =
          currentText.style.fontStyle === "italic" ? "normal" : "italic";
      }
    });
  
    // Alignment Functionality
    alignmentBtn.addEventListener("click", () => {
        if (currentText) {
         
          alignmentState = alignmentState === "left" ? "center" : alignmentState === "center" ? "right" : "left";
      
          if (alignmentState === "left") {
            currentText.style.textAlign = "left";
            currentText.style.left = "0";
            currentText.style.right = "auto";
            currentText.style.transform = "none"; 
          } else if (alignmentState === "center") {
            currentText.style.textAlign = "center";
            currentText.style.left = "50%";
            currentText.style.right = "auto";
            currentText.style.transform = "translateX(-50%)"; 
          } else if (alignmentState === "right") {
            currentText.style.textAlign = "right";
            currentText.style.left = "auto";
            currentText.style.right = "0";
            currentText.style.transform = "none"; 
          }
        }
      });
      
  
    // Underline Functionality
    underlineBtn.addEventListener("click", () => {
      if (currentText) {
        currentText.style.textDecoration =
          currentText.style.textDecoration === "underline"
            ? "none"
            : "underline";
      }
    });
  
    // Make Text Movable
    function makeMovable(element) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;
  
      element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        element.style.cursor = "grabbing"; 
      });
  
      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const containerRect = textContainer.getBoundingClientRect();
          const elementWidth = element.offsetWidth;
          const elementHeight = element.offsetHeight;
  
          let newLeft = e.clientX - containerRect.left - offsetX;
          let newTop = e.clientY - containerRect.top - offsetY;
  
          newLeft = Math.max(0, Math.min(newLeft, containerRect.width - elementWidth));
          newTop = Math.max(0, Math.min(newTop, containerRect.height - elementHeight));
  
          element.style.left = `${newLeft}px`;
          element.style.top = `${newTop}px`;
        }
      });
  
      document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.cursor = "move"; 
      });
    }

    //delete current text
    deleteInput.addEventListener("click",()=>{
        currentText.style.display="none"
    })

  });
  
  