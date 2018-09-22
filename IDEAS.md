# Ideas

## Error

### Error Format
```
  {
    error: {
      message: ''
      code: 0,
      meta: {}
    }
  }
```

### Error Codes
```
  1 -> Required field missing
  2 -> Invalid data provided
  ... For future use
```

### Example
```
  {
    error: {
      message: 'Required field(s) missing'
      code: 1,
      meta: {
        fields: ['Email', 'Password']
      }
    }
  }
```
