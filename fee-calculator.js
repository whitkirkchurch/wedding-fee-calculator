const baseIncludes = [
  ["Reading of banns", 36],
  ["Fee to the PCC", 288],
  ["Diocese", 240],
  ["Heating fee", 20],
  ["Verger's fee", 40],
  ["Organist's fee", 120]
]

const bellsItem = ["Ringing of bells", 50]

const choirItem = ["Choir's fee", 140]
const soloistItem = ["Soloist's fee", 40]

const erpOrganistItem = ["Permission to record organist's performance", 60]
const erpChoirItem = ["Permission to record choir's performance", 70]
const erpSoloistItem = ["Permission to record soloist's performance", 20]

const streamingItem = ["Live streaming of the service", 100]

const technicianItem = ["AV technician's fee", 96]

const memoryStickItem = ["Copy of service stream on a memory stick", 10]

function calculateCost() {

  let includes = baseIncludes.slice()

  const extraBells = document.getElementById('extraBells').checked

  const extraChoir = document.getElementById('extraChoir').checked
  const extraSoloist = document.getElementById('extraSoloist').checked

  const extraOwnVideo = document.getElementById('extraOwnVideo').checked
  const extraInHouseVideo = document.getElementById('extraInHouseVideo').checked
  const extraMemoryStick = document.getElementById('extraMemoryStick').checked

  if (extraBells) {
    includes.push(bellsItem)
  }

  if (extraChoir) {
    includes.push(choirItem)
  }

  if (extraSoloist) {
    includes.push(soloistItem)
  }

  // If we do either of the recording options, add record permissions
  if (extraOwnVideo || extraInHouseVideo) {
    includes.push(erpOrganistItem)

    if (extraChoir) {
      includes.push(erpChoirItem)
    }

    if (extraSoloist) {
      includes.push(erpSoloistItem)
    }
  }

  if (extraInHouseVideo) {

    includes.push(streamingItem)
    includes.push(technicianItem)

    if (extraMemoryStick) {
      includes.push(memoryStickItem)
    }
  }

  updateTotal(includes)
}

function updateTotal(includes) {

  var includesList = ''
  var totalCost = 0

  includes.forEach(item => {
    if (isNaN(item[1])) {
      includesList += `<li>${item[0]} (N/A)</li>`
    } else {
      totalCost += item[1]
      includesList += `<li>${item[0]} (£${item[1]})</li>`
    }
  });

  document.getElementById("includesHeader").style.display = "block";

  document.getElementById("total").innerHTML = `£${totalCost}`
  document.getElementById('includesList').innerHTML = includesList
}

const extraInHouseVideoCheckbox = document.getElementById('extraInHouseVideo')

extraInHouseVideoCheckbox.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("extraMemoryStickCheckbox").style.display = "block"
  } else {
    document.getElementById("extraMemoryStickCheckbox").style.display = "none";
  }
})
