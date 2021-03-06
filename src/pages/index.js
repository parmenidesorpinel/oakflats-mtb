import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import TopParallax from '../components/Images/TopParallax/'
import MapWithMarker from '../components/Maps/MapWithMarker'
import RowSeparator from '../components/RowSeparator/'
import image from '../static/img/manzano-mountains.jpg'
import { Headline1, SingleCol, Container, Col } from '../components/Typography'
import SiteFooter from '../components/SiteFooter'
import { categories, sponsors as newSponsors } from '../data/categories.json'

//function importAll(r) {
//  return r.keys().map(r)
//}
//
//const sponsors = importAll(
//  require.context('../static/img/sponsors/', false, /\.(png|jpe?g|svg)$/)
//)

const loadedSponsors = newSponsors.map(s => {
  s.photo = require('../static/img/sponsors/' + s.photo)
  return s
})

const goldSponsors = loadedSponsors.filter(sponsor => sponsor.type == 'gold')
const silverSponsors = loadedSponsors.filter(
  sponsor => sponsor.type == 'silver'
)

class Index extends React.Component {
  render() {
    const { location, title, date } = this.props.data.site.siteMetadata
    const viewport = { ...location, height: 400 }
    const point = location.point
    const site = get(this, 'props.data.site.siteMetadata')
    const description =
      'Oakflats Bike Race in Albuquerque, New Mexico : The Race will Take place on July 29th, 2018 in Oakflats within the Cibola National Forest close by to ABQ'
    const tags = [
      'Oakflats',
      'Bike',
      'Race',
      'ABQ',
      'Albuquerque',
      'New Mexico',
    ]

    return (
      <div>
        <Helmet
          title={get(site, 'title')}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: tags.join(', ') },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: `@${get(site, 'twitter')}` },
            { property: 'og:title', content: get(site, 'title') },
            { property: 'og:type', content: 'website' },
            { property: 'og:description', content: get(site, 'description') },
            { property: 'og:url', content: get(site, 'url') },
            {
              property: 'og:image',
              content: `${get(site, 'url')}/img/profile.jpg`,
            },
          ]}
        />
        {/* top parallax */}
        <TopParallax title={title} image={image} date={date} />
        {/* registration information */}
        {/* general race information */}
        <Container>
          <hr css={{ marginTop: '2em' }} />
          <Headline1>Categories</Headline1>
          <RowSeparator elementsPerRow={3} RowRenderer={Col}>
            {categories.map((category, idx) => (
              <div
                className="col-md-4 col-sm-1 col-xs-1 text-center"
                css={{ marginBottom: '2em' }}
                key={idx}
              >
                <h4>
                  <span className="badge badge-secondary">
                    {category.friendlyName}
                  </span>
                </h4>
                <h4>{category.name}</h4>
                <span>{category.miles} miles</span>
              </div>
            ))}
          </RowSeparator>
          <SingleCol>
            <div className="text-center">
              <Link to={'/info/categories/'}>more category info</Link>
            </div>
          </SingleCol>
          <hr css={{ marginTop: '2em' }} />
          {/* sponsors */}
          <Headline1>Sponsors</Headline1>
          <Col>
            {goldSponsors.map((sponsor, idx) => (
              <div
                className="col-12 col-md-4 col-sm-6 col-xs-6 text-center"
                css={{ marginBottom: '2em' }}
                key={idx}
              >
                <a href={sponsor.website}>
                  <img
                    src={sponsor.photo}
                    css={{
                      display: 'block',
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '200',
                      margin: 'auto auto',
                    }}
                  />
                </a>
              </div>
            ))}
          </Col>
          <Col>
            {silverSponsors.map((sponsor, idx) => (
              <div
                className="col-6 col-md-2 col-sm-4 col-xs-4"
                css={{ marginBottom: '2em' }}
                key={idx}
              >
                <a href={sponsor.website}>
                  <img
                    src={sponsor.photo}
                    css={{
                      display: 'block',
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '130',
                      margin: 'auto auto',
                    }}
                  />
                </a>
              </div>
            ))}
          </Col>
          <hr css={{ marginTop: '2em' }} />
          {/* location information */}
          <Headline1>Race Location</Headline1>
          <SingleCol>
            <p className="text-center">Oak Flat / Cedro Peak, NM</p>
          </SingleCol>
        </Container>
        <MapWithMarker
          location={location}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GoogleAccessToken
          }&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <SiteFooter />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        date
        description
        url: siteUrl
        author
        twitter
        adsense
        location {
          latitude
          longitude
          zoom
          point {
            latitude
            longitude
          }
        }
      }
    }
  }
`

export default Index
