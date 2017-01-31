function getDataFromElement(element) {
  if(element.tagName === "TEXTAREA") {
    return element.value;
  }
  
  if(element.tagName === "INPUT") {
    if(element.type === "checkbox") {
      return element.checked;
    }
    
    return element.value;
  }
  
  if(element.tagName === "SELECT") {
    return element.value;
  }
  
  return element.textContent;

}

function getDataFromNodeList(nodeList) {
  var r = []; //Return aRRay
  var element,field,value;
  for (var i = 0; i < nodeList.length; i++) {
    element = nodeList[i];
    field = element.dataset.field;
    value = getDataFromElement(element);
    
    r.push({
      key : field,
      value : value
    });
  }
  
  return r;
}

function getNodeList(origin) {
  if(origin instanceof Element) {
    return origin.querySelectorAll("[data-field]");
  }
  
  if(Blaze && Blaze.TemplateInstance && origin instanceof Blaze.TemplateInstance) {
    return origin.findAll("[data-field]");
  }
  
  throw new Error("Could not get field data from "+origin);
}

export function gatherFields(origin) {
  var nodeList = getNodeList(origin);  
  return getDataFromNodeList(nodeList);
}