---
title: Testing the object you pass in a mocked method
description: "Sometimes you need to mock a method that has as argument an object, but how to make sure this object is being passed properly?"
date: "2021-01-13T13:00:00.000Z"
tags: ["php", "laravel", "phpunit", "test"]
---

Let's image we have a class:

```php
class EmailSender
{
    public function send(Email $email): void
    {
        // your implementation
    }
}
```

The `Email` class will hold the details to the email you want to send:

```php
class Email
{
    public string $template;

    public string $email;
    
    //...
}
```

If you want to mock the `EmailSender` you can do something like this:

```php
...

class EmailSenderTest extends TestCase
{
    public function testEmailSender()
    {
        $this->instance(
            EmailSender::class,
            Mockery::mock(EmailSender::class, function (MockInterface $mock) {
                $mock->shouldReceive('send')
                    ->withAnyArgs()
                    ->once();
            })
        );
        
        ...
    }
}
```

The approach above you are testing if the `send` message is called once, but you haven`t tested if the argument provided to the method has the correct data on it.

To add checks on the object as well, you can assert it in the `with` for a mocked object, as:

```php
...

class EmailSenderTest extends TestCase
{
    public function testEmailSender()
    {
        $this->instance(
            EmailSender::class,
            Mockery::mock(EmailSender::class, function (MockInterface $mock) {
                $mock->shouldReceive('send')
                    ->with(Mockery::on(function (Email $email) {
                        $this->assertEquals('my-template', $email->template);
                        $this->assertEquals('john.doe@sample.com', $email->email);
                    })->once();
            })
        );
        
        ...
    }
}
```

This way your test is only going to pass if the `Email` class has expected **template** and **email** properties.
