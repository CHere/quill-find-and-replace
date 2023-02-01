import "./quill.mention.css";

class FindAndReplace{
    constructor(quill, options) {
        super(quill, options);
    
        this.quill = quill;
        this.toolbar = quill.getModule("toolbar");
        if (typeof this.toolbar !== "undefined")
          this.toolbar.addHandler("findAndReplace", this.checkToolbarExists);
    
        var farButtons = document.getElementsByClassName("ql-find-and-replace");
        if (farButtons) {
          [].slice.call(emofarButtonsjiBtns).forEach(function (farButtons) {
            farButtons.innerHTML = options.buttonIcon;
          });
        }
      }
      checkToolbarExists() {
        let quill = this.quill;
        checkDialogOpen(quill);
        this.quill.on("text-change", function (delta, oldDelta, source) {
          if (source === "user") {
            close();
          }
        });
      }
    }
    FindAndReplaceToolbar.DEFAULTS = {
      buttonIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" id="mainIconPathAttribute"></path> </svg>',
    };
    
    function close() {
        let ele_far_plate = document.getElementById('far-toolbar');
        document.getElementById('far-close-div').style.display = "none";
        if (ele_far_plate) {
            ele_far_plate.remove()
        }
      }
    
      function checkDialogOpen(quill) {
        let elementExists = document.getElementById("far-toolbar");
        if (elementExists) {
          elementExists.remove();
        } else {
          showFindAndReplace(quill);
        }
      }
    
      function showFindAndReplace(quill) {
        const toolbarWidthAndHeight = 250;
        let ele_toolbar_area = document.createElement('div');
        let selection = quill.getSelection();
        const selectionBounds = quill.getBounds(selection.index);
        const editorBounds = quill.container.getBoundingClientRect();
        const selectionCenter = (selectionBounds.left + selectionBounds.right) / 2;
        const selectionMiddle = (selectionBounds.top + selectionBounds.bottom) / 2;
        const toolbarLeft = editorBounds.left + selectionCenter + toolbarWidthAndHeight <= document.documentElement.clientWidth ? selectionCenter : editorBounds.left - toolbarWidthAndHeight;
        const toolbarTop = editorBounds.top + selectionMiddle + toolbarWidthAndHeight + 10 <= document.documentElement.clientHeight ? selectionMiddle + 10 :
          editorBounds.top + selectionMiddle - toolbarWidthAndHeight - 10 >= 0 ? selectionMiddle - toolbarWidthAndHeight - 10 :
            document.documentElement.clientHeight - toolbarWidthAndHeight - editorBounds.top;
      
        quill.container.appendChild(ele_toolbar_area);
        ele_toolbar_area.id = 'far-toolbar';
        ele_toolbar_area.style.left = `${toolbarLeft}px`;
        ele_toolbar_area.style.top = `${toolbarTop}px`;
      
        //panel
        let panel = document.createElement('div');
        panel.id = "tab-panel";
        ele_toolbar_area.appendChild(panel);
      
      
        if (document.getElementById('far-close-div') === null) {
          let closeDiv = document.createElement('div');
          closeDiv.id = 'far-close-div';
          closeDiv.addEventListener("click", fn_close, false);
          document.getElementsByTagName('body')[0].appendChild(closeDiv);
        } else {
          document.getElementById('far-close-div').style.display = "block";
        }
      }
    

export default FindAndReplace