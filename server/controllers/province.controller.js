import { fetchProvince } from '../help'

export const getAllProvince = async (req, res, next) => {
  try {
    const result = await fetchProvince(
      'https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces'
    )
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getDistrictOfProvince = async (req, res, next) => {
  try {
    // console.log(req.params.province)
    const { province } = req.params
    const result = await fetchProvince(
      `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province}/district`
    )
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSubdistrictOfDistrict = async (req, res, next) => {
  try {
    // console.log(req.params.province)
    const { province, district } = req.params
    // console.log(province, district)
    const result = await fetchProvince(
      `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province}/district/${district}`
    )

    res.json(result)
  } catch (e) {
    next(e)
  }
}
