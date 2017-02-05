function getDataFromElement(element) {
  if (element.tagName === 'TEXTAREA') {
    return element.value;
  }
  
  if (element.tagName === 'INPUT') {
    if (element.type === 'checkbox') {
      return element.checked;
    }
    
    return element.value;
  }
  
  if (element.tagName === 'SELECT') {
    return element.value;
  }
  
  return element.textContent;
}

function getDataFromNodeList(nodeList) {
  const returnObject = {};
  let index;
  let element;
  let field;
  let value;
  for (index = 0; index < nodeList.length; index += 1) {
    element = nodeList[index];
    field = element.dataset.field;
    value = getDataFromElement(element);
    
    returnObject[field] = value;
  }
  
  return returnObject;
}

function getNodeList(origin) {
  if (origin instanceof Element) {
    return origin.querySelectorAll('[data-field]');
  }
  
  if (Blaze && Blaze.TemplateInstance && origin instanceof Blaze.TemplateInstance) {
    return origin.findAll('[data-field]');
  }
  
  throw new Error(`Could not get field data from ${origin}`);
}

export function gatherFields(origin) {
  const nodeList = getNodeList(origin);  
  return getDataFromNodeList(nodeList);
}
