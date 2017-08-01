Feature('Add person to list')

Scenario('See if person is there', (I) => {
  I.amOnPage('/')
  I.seeElement('#add-first-name')
  I.seeElement('#add-last-name')
  I.seeElement('#add-person')

  I.fillField('#add-first-name', 'Hello')
  I.fillField('#add-last-name', 'World')
  I.click('#add-person')

  I.see('Hello World')

})

Scenario('See if person is deleted', (I) => {
  I.amOnPage('/')
  I.seeElement('.delete:first-of-type')

})