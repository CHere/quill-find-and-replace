import "./quill.mention.css";

class FindAndReplace{
    constructor(quill, options) {
        super(quill, options);
    
        this.quill = quill;
        this.toolbar = quill.getModule("toolbar");
        if (typeof this.toolbar !== "undefined")
          this.toolbar.addHandler("findAndReplace", this.checkPaletteExists);
    
        var farButtons = document.getElementsByClassName("ql-find-and-replace");
        if (farButtons) {
          [].slice.call(emofarButtonsjiBtns).forEach(function (farButtons) {
            farButtons.innerHTML = options.buttonIcon;
          });
        }
      }
      checkPaletteExists() {
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
        '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>',
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
          showEmojiPalette(quill);
        }
      }
    
      function showEmojiPalette(quill) {
        const paletteWidthAndHeight = 250;
        let ele_toolbar_area = document.createElement('div');
        let selection = quill.getSelection();
        const selectionBounds = quill.getBounds(selection.index);
        const editorBounds = quill.container.getBoundingClientRect();
        const selectionCenter = (selectionBounds.left + selectionBounds.right) / 2;
        const selectionMiddle = (selectionBounds.top + selectionBounds.bottom) / 2;
        const paletteLeft = editorBounds.left + selectionCenter + paletteWidthAndHeight <= document.documentElement.clientWidth ? selectionCenter : editorBounds.left - paletteWidthAndHeight;
        const paletteTop = editorBounds.top + selectionMiddle + paletteWidthAndHeight + 10 <= document.documentElement.clientHeight ? selectionMiddle + 10 :
          editorBounds.top + selectionMiddle - paletteWidthAndHeight - 10 >= 0 ? selectionMiddle - paletteWidthAndHeight - 10 :
            document.documentElement.clientHeight - paletteWidthAndHeight - editorBounds.top;
      
        quill.container.appendChild(ele_toolbar_area);
        ele_toolbar_area.id = 'far-toolbar';
        ele_toolbar_area.style.left = `${paletteLeft}px`;
        ele_toolbar_area.style.top = `${paletteTop}px`;
      
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