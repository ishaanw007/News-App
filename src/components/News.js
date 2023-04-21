import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = this.props.category;
  }
  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=c8bd8d4f450d459f9ec27ca0e4e98940&page=1&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  handleprevclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=c8bd8d4f450d459f9ec27ca0e4e98940&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);

    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading: false,
    });
  };
  handlenextclick = async () => {
    // if (
    //   !this.state.page + 1 >
    //   Math.ceil(this.state.totalresults / this.props.pageSize)
    // ) {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=c8bd8d4f450d459f9ec27ca0e4e98940&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);

    this.setState({
      page: this.state.page + 1,
      articles: parseddata.articles,
    });
    // }
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=c8bd8d4f450d459f9ec27ca0e4e98940&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
    });
  };
  render() {
    return (
      <>
        <h2 className="m-3 text-center">Top Headlines-{this.props.category}</h2>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container my-3 ">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : ""
                      }
                      url={
                        element.urlToImage == null
                          ? "https://image.cnbcfm.com/api/v1/image/107228185-1681935493510-gettyimages-1246298489-DAVOS_WEF_2023.jpeg?v=1681935602&w=1920&h=1080"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                    ></Newsitem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            class="btn btn-dark m-3"
            onClick={this.handleprevclick}
          >
            Previous
          </button>

          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalresults / this.props.pageSize)
            }
            class="btn btn-dark m-3"
            onClick={this.handlenextclick}
          >
            Next
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
