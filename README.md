# react-paginator
[![Build Status](https://travis-ci.org/doctolib/react-paginator.svg?branch=master)](https://travis-ci.org/doctolib/react-paginator)
[![codecov](https://codecov.io/gh/doctolib/react-paginator/branch/master/graph/badge.svg)](https://codecov.io/gh/doctolib/react-paginator)

Basic paginator component for React. This component is designed to be used with Bootstrap but you can use it with your own style.

## Install

```
npm install @doctolib/react-paginator
```

## [Examples](http://doctolib.github.io/react-paginator/)

## Usage

```js
class MyComponent extends React.Component {
  state = { page: 1 }

  onPageChange = (page) => this.setState({page})

  render() {
    return (
      <Paginator
        nbRowsPerPage={20}
        onPageChange={this.onPageChange}
        page={this.state.page}
        total={200}
      />
    );
  }
}
```

### Properties

#### condensed

Display a condensed version of the paginator.

```js
<Paginator
  condensed
  nbRowsPerPage={20}
  page={1}
  total={200}
/>
```

#### size

You can specify the size to display the paginator, values accepted are small, medium, large. Default is medium.

```js
<Paginator
  nbRowsPerPage={20}
  page={1}
  size="small"
  total={200}
/>
```

#### showInfos

Display additionnal informations next to paginator (ex: 181-200 / 300).

```js
<Paginator
  nbRowsPerPage={20}
  page={1}
  showInfos
  total={200}
/>
```

#### labels

You can use custom labels for the paginator:

```js
<Paginator
  breakLabel="..."
  firstAriaLabel="Premier"
  firstLabel="<<"
  lastAriaLabel="Dernier"
  lastLabel=">>"
  nbRowsPerPage={20}
  nextAriaLabel="Suivant"
  nextLabel=">"
  page={1}
  previousAriaLabel="Précédent"
  previousLabel="<"
  total={300}
/>
```

#### disabled

The paginator can be displayed in disabled mode.

```js
<Paginator
  disabled
  nbRowsPerPage={20}
  page={1}
  total={200}
/>
```

## License

MIT
